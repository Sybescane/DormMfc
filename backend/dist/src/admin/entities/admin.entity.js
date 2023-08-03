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
exports.Admin = void 0;
const typeorm_1 = require("typeorm");
const admin_type_enum_1 = require("./admin-type.enum");
const dormitory_entity_1 = require("../../dormitory/entity/dormitory.entity");
const swagger_1 = require("@nestjs/swagger");
let Admin = class Admin {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'admin_id' }),
    __metadata("design:type", Number)
], Admin.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IvanovII', description: 'Логин для входа в админ панель' }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Admin.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ваш сложный пароль для входа' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Иванов Иван Иванович', description: 'ФИО' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Admin.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Показывать данные админа или нет для заселяющихся' }),
    (0, typeorm_1.Column)({
        name: 'is_show',
        default: false
    }),
    __metadata("design:type", Boolean)
], Admin.prototype, "isShow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Администратор общежития Г-1', description: 'Должность в общежитии' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Admin.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+79876543210', description: 'Контакты администратора' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Admin.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: admin_type_enum_1.AdminType,
        name: 'admin_type'
    }),
    __metadata("design:type", String)
], Admin.prototype, "adminType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dormitory_entity_1.Dormitory, (dorm) => dorm.admins),
    __metadata("design:type", dormitory_entity_1.Dormitory)
], Admin.prototype, "dormitory", void 0);
Admin = __decorate([
    (0, typeorm_1.Entity)('admins')
], Admin);
exports.Admin = Admin;
//# sourceMappingURL=admin.entity.js.map