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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const dormitory_entity_1 = require("../dormitory/entity/dormitory.entity");
const user_for_admin_dto_1 = require("../admin/dto/user-for-admin.dto");
let UserService = class UserService {
    constructor(userRepository, dormRepository) {
        this.userRepository = userRepository;
        this.dormRepository = dormRepository;
    }
    async create(dto) {
        const oldUser = await this.findOneByPersonalNumber(dto.personalNumber);
        if (oldUser != null) {
            throw new common_1.BadRequestException('Этот пользователь уже существует');
        }
        const newUser = this.userRepository.create();
        newUser.personalNumber = dto.personalNumber;
        newUser.fullname = dto.fullname;
        newUser.gender = dto.gender;
        newUser.citizenship = dto.citizenship;
        newUser.faculty = dto.faculty;
        newUser.phone = dto.phone;
        newUser.educationLevel = dto.educationLevel;
        const oldRecord = await this.userRepository.find({
            where: {
                dormitory: {
                    name: dto.dormitory_name
                },
                recordDatetime: new Date(dto.recordDatetime)
            }
        });
        if (oldRecord.length > 0) {
            throw new common_1.BadRequestException('Это время уже занято');
        }
        newUser.recordDatetime = new Date(dto.recordDatetime);
        newUser.dormitory = await this.dormRepository.findOneBy({
            name: dto.dormitory_name
        });
        const savedUser = await this.userRepository.save(newUser);
        const userRes = new user_for_admin_dto_1.UserForAdminDto(savedUser);
        return userRes;
    }
    async findAllForAdmin(dorm_name = null) {
        if (dorm_name == null) {
            return await this.userRepository.find({
                where: {
                    recordDatetime: (0, typeorm_2.Not)((0, typeorm_2.IsNull)())
                },
                relations: {
                    dormitory: true
                }
            });
        }
        else {
            return await this.userRepository.find({
                where: {
                    dormitory: {
                        name: dorm_name
                    },
                    recordDatetime: (0, typeorm_2.Not)((0, typeorm_2.IsNull)())
                },
                relations: {
                    dormitory: true
                }
            });
        }
    }
    async findOneByPersonalNumber(personalNumber) {
        const user = await this.userRepository.findOne({
            where: {
                personalNumber: personalNumber
            },
            relations: {
                dormitory: true
            }
        });
        return user;
    }
    async findOneByEmail(email) {
        const personalNumber = user_entity_1.User.GetNumberFromEmail(email);
        const user = await this.findOneByPersonalNumber(personalNumber);
        return user;
    }
    async takeTime(dto) {
        var _a;
        const user = await this.findOneByEmail(dto.email);
        if (user == null) {
            throw new common_1.BadRequestException('Такой студент не заселяется');
        }
        const takenTime = await this.getTakenTime(user.dormitory.name);
        if (takenTime.includes(new Date(dto.recordDatetime).toLocaleString())) {
            throw new common_1.BadRequestException('Это время уже заняли');
        }
        user.recordDatetime = (_a = new Date(dto.recordDatetime)) !== null && _a !== void 0 ? _a : user.recordDatetime;
        const savedUser = await this.userRepository.save(user);
        const userRes = new user_for_admin_dto_1.UserForAdminDto(savedUser);
        return userRes;
    }
    async update(dto) {
        var _a, _b, _c, _d, _e, _f;
        const user = await this.findOneByEmail(dto.email);
        if (user == null) {
            throw new common_1.BadRequestException('Такой студент не заселяется');
        }
        const takenTime = await this.getTakenTime(user.dormitory.name);
        if (takenTime.includes(new Date(dto.recordDatetime).toLocaleString())) {
            throw new common_1.BadRequestException('Это время уже заняли');
        }
        user.gender = (_a = dto.gender) !== null && _a !== void 0 ? _a : user.gender;
        user.fullname = (_b = dto.fullname) !== null && _b !== void 0 ? _b : user.fullname;
        user.citizenship = (_c = dto.citizenship) !== null && _c !== void 0 ? _c : user.citizenship;
        user.faculty = (_d = dto.faculty) !== null && _d !== void 0 ? _d : user.faculty;
        user.phone = (_e = dto.phone) !== null && _e !== void 0 ? _e : user.phone;
        user.recordDatetime = (_f = new Date(dto.recordDatetime)) !== null && _f !== void 0 ? _f : user.recordDatetime;
        user.dormitory = await this.dormRepository.findOneBy({
            name: dto.dormitory_name
        });
        const savedUser = await this.userRepository.save(user);
        const userRes = new user_for_admin_dto_1.UserForAdminDto(savedUser);
        return userRes;
    }
    async removeRecord(email) {
        const user = await this.findOneByEmail(email);
        if (user == null) {
            throw new common_1.BadRequestException('Такого пользователя нет в базе данных на заселение');
        }
        user.recordDatetime = null;
        await this.userRepository.save(user);
    }
    async save(user) {
        await this.userRepository.save(user);
    }
    async getTakenTime(dorm_name) {
        const result = [];
        const users = await this.userRepository.find({
            where: {
                dormitory: {
                    name: dorm_name
                },
                recordDatetime: (0, typeorm_2.Not)((0, typeorm_2.IsNull)())
            }
        });
        users.forEach((user) => {
            result.push(user.recordDatetime.toLocaleString());
        });
        return result;
    }
    async getUserFromObject(item) {
        var _a;
        const oldUser = await this.findOneByPersonalNumber(item['Рег.номер']);
        let newUser = this.userRepository.create();
        if (oldUser != null) {
            newUser = oldUser;
        }
        newUser.fullname = item['ФИО'];
        newUser.personalNumber = parseInt(item['Рег.номер']);
        newUser.gender = (_a = item['Пол']) !== null && _a !== void 0 ? _a : null;
        newUser.citizenship = item['Гражданство'];
        newUser.faculty = item['Подразделение'];
        newUser.phone = item['Телефон'];
        newUser.educationLevel = item['Уровень подготовки'];
        if (item["Рекомендуемое общежитие"] != null) {
            newUser.dormitory = await this.dormRepository.findOneBy({
                name: item['Рекомендуемое общежитие']
            });
        }
        else {
            newUser.dormitory = null;
        }
        return newUser;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(dormitory_entity_1.Dormitory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map