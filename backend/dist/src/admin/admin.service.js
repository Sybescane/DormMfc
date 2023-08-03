"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const xlsx_1 = require("xlsx");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const admin_entity_1 = require("./entities/admin.entity");
const argon2_1 = require("argon2");
const admin_type_enum_1 = require("./entities/admin-type.enum");
const dormitory_service_1 = require("../dormitory/dormitory.service");
const dormitory_enum_1 = require("../dormitory/entity/dormitory.enum");
let AdminService = class AdminService {
    constructor(adminRepository, dormService, userService) {
        this.adminRepository = adminRepository;
        this.dormService = dormService;
        this.userService = userService;
    }
    async createAdmin(dto) {
        const oldAdmin = await this.adminRepository.findOneBy({
            login: dto.login
        });
        if (oldAdmin != null) {
            throw new common_1.BadRequestException("Такой пользователь уже существует");
        }
        const newAdmin = this.adminRepository.create();
        newAdmin.login = dto.login;
        newAdmin.password = await (0, argon2_1.hash)(dto.password);
        newAdmin.fullname = dto.fullname;
        newAdmin.isShow = dto.isShow;
        newAdmin.position = dto.position;
        newAdmin.adminType = dto.adminType;
        newAdmin.phone = dto.phone;
        newAdmin.dormitory = await this.dormService.findOneByName(dto.dormitory_name);
        return await this.adminRepository.save(newAdmin);
    }
    findAll() {
        return `This action returns all admin`;
    }
    async findOneByLogin(login) {
        return await this.adminRepository.findOne({
            where: {
                login
            },
            relations: {
                dormitory: true
            }
        });
    }
    update(id, updateAdminDto) {
        return `This action updates a #${id} admin`;
    }
    remove(id) {
        return `This action removes a #${id} admin`;
    }
    async parseFromExcel() {
        const workbook = (0, xlsx_1.readFile)("src/files/RASPRED.xlsx");
        const worksheet = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData = xlsx_1.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = Object.values(jsonData[0]);
        const data = jsonData.slice(1);
        const result = data.map((row) => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index];
            });
            return obj;
        });
        for (const obj of result) {
            if (obj['Рег.номер'] != undefined && obj['Нуждаемость в общежитии'] != undefined) {
                const user = await this.userService.getUserFromObject(obj);
                await this.userService.save(user);
            }
        }
    }
    async getAdminsForShow(dorm_name) {
        const admins = await this.adminRepository.find({
            where: {
                dormitory: {
                    name: dorm_name
                },
                isShow: true
            }
        });
        return admins.map(contact => ({
            fullname: contact.fullname,
            position: contact.position,
            phone: contact.phone
        }));
    }
    async findAllUsers(login) {
        const admin = await this.findOneByLogin(login);
        if (admin.adminType === admin_type_enum_1.AdminType.Main) {
            const users = await this.userService.findAllForAdmin({
                where: {
                    recordDatetime: (0, typeorm_2.Not)((0, typeorm_2.IsNull)())
                },
                relations: {
                    dormitory: true
                }
            });
            const result = {
                [dormitory_enum_1.DormitoryEnum.M1]: [],
                [dormitory_enum_1.DormitoryEnum.M2]: [],
                [dormitory_enum_1.DormitoryEnum.M3]: [],
                [dormitory_enum_1.DormitoryEnum.M4]: [],
                [dormitory_enum_1.DormitoryEnum.G1]: [],
                [dormitory_enum_1.DormitoryEnum.G2]: [],
                [dormitory_enum_1.DormitoryEnum.DSG]: [],
                [dormitory_enum_1.DormitoryEnum.DK]: [],
            };
            users.forEach((user) => {
                if (user.dormitory && user.dormitory.name in result) {
                    user.recordDatetime.setHours(user.recordDatetime.getHours() + 3);
                    result[user.dormitory.name].push(user);
                }
            });
            return result;
        }
        else {
            const users = await this.userService.findAllForAdmin({
                where: {
                    recordDatetime: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                    dormitory: admin.dormitory
                }
            });
            const result = {};
            result[admin.dormitory.name] = users;
            return result;
        }
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        dormitory_service_1.DormitoryService,
        user_service_1.UserService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map