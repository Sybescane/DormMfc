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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const gender_enum_1 = require("./gender.enum");
const dormitory_entity_1 = require("../../dormitory/entity/dormitory.entity");
const swagger_1 = require("@nestjs/swagger");
const education_enum_1 = require("./education.enum");
let User = class User {
    static GetEmailFromNumber(personalNumber) {
        return 'm' + personalNumber + '@edu.misis.ru';
    }
    static GetNumberFromEmail(email) {
        const regex = /^m(\d{7})@edu\.misis\.ru$/;
        const matches = email.match(regex);
        if (matches && matches.length > 1) {
            return parseInt(matches[1]);
        }
        else {
            return null;
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', example: 2110501, description: 'Номер личного дела МИСИС' }),
    (0, typeorm_1.Column)({ unique: true, name: 'personal_number' }),
    __metadata("design:type", Number)
], User.prototype, "personalNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', example: 'Иванов Иван Иванович', description: 'ФИО студента' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enumName: 'Gender', enum: gender_enum_1.Gender, description: 'Пол студента' }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: gender_enum_1.Gender,
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Россия', description: 'Гражданство студента' }),
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "citizenship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ИТКН', description: 'Факультет студента' }),
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "faculty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+7(999)888-77-66', description: 'Номер телефона студента' }),
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', description: 'Код подтверждения с почты' }),
    (0, typeorm_1.Column)({
        name: 'code_confirm',
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "codeConfirm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '2023-08-25T10:00:00', description: 'Время заселения' }),
    (0, typeorm_1.Column)({
        name: 'record_datetime',
        nullable: true
    }),
    __metadata("design:type", Date)
], User.prototype, "recordDatetime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enumName: 'EducationLevel', enum: education_enum_1.EducationLevelEnum, description: 'Пол студента' }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: education_enum_1.EducationLevelEnum,
        nullable: true,
        name: 'education_level'
    }),
    __metadata("design:type", String)
], User.prototype, "educationLevel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dormitory_entity_1.Dormitory, (dorm) => dorm.users),
    (0, typeorm_1.JoinColumn)({
        name: 'dormitory_id'
    }),
    __metadata("design:type", dormitory_entity_1.Dormitory)
], User.prototype, "dormitory", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map