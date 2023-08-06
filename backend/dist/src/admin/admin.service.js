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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const xlsx_1 = require("xlsx");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
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
        const savedAdmin = await this.adminRepository.save(newAdmin);
        const { password, adminId, dormitory } = savedAdmin, result = __rest(savedAdmin, ["password", "adminId", "dormitory"]);
        result['dorm_name'] = savedAdmin.dormitory.name;
        return result;
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
        let users = [];
        let result = {};
        console.log(result);
        if (admin.adminType === admin_type_enum_1.AdminType.Main) {
            result[dormitory_enum_1.DormitoryEnum.M1] = [];
            result[dormitory_enum_1.DormitoryEnum.M2] = [];
            result[dormitory_enum_1.DormitoryEnum.M3] = [];
            result[dormitory_enum_1.DormitoryEnum.M4] = [];
            result[dormitory_enum_1.DormitoryEnum.G1] = [];
            result[dormitory_enum_1.DormitoryEnum.G2] = [];
            result[dormitory_enum_1.DormitoryEnum.DSG] = [];
            result[dormitory_enum_1.DormitoryEnum.DK] = [];
            users = await this.userService.findAllForAdmin();
        }
        else {
            result[admin.dormitory.name] = [];
            users = await this.userService.findAllForAdmin(admin.dormitory.name);
        }
        users.forEach((user) => {
            if (user.dormitory && user.dormitory.name in result) {
                const userRes = {
                    email: user_entity_1.User.GetEmailFromNumber(user.personalNumber),
                    fullname: user.fullname,
                    gender: user.gender,
                    citizenship: user.citizenship,
                    educationLevel: user.educationLevel,
                    recordDatetime: user.recordDatetime.toLocaleString()
                };
                result[user.dormitory.name].push(userRes);
            }
        });
        return result;
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