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
exports.Dormitory = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../../admin/entities/admin.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
const dormitory_enum_1 = require("./dormitory.enum");
let Dormitory = class Dormitory {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'уникальный идентификатор' }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'dormitory_id' }),
    __metadata("design:type", Number)
], Dormitory.prototype, "dormitoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enumName: 'DormName', enum: dormitory_enum_1.DormitoryEnum, description: 'общежитие студента' }),
    (0, typeorm_1.Column)({
        unique: true,
        enum: dormitory_enum_1.DormitoryEnum,
        type: 'enum',
        enumName: 'dormitory_enum',
        nullable: true
    }),
    __metadata("design:type", String)
], Dormitory.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ул. Профсоюзная д.83к1', description: 'адрес общежития' }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Dormitory.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'В это общежитие есть то и то', description: 'описание общежития' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Dormitory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => admin_entity_1.Admin, (admin) => admin.adminId),
    __metadata("design:type", Array)
], Dormitory.prototype, "admins", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.dormitory),
    __metadata("design:type", Array)
], Dormitory.prototype, "users", void 0);
Dormitory = __decorate([
    (0, typeorm_1.Entity)('dormitories')
], Dormitory);
exports.Dormitory = Dormitory;
//# sourceMappingURL=dormitory.entity.js.map