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
exports.CreateAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const admin_entity_1 = require("../entities/admin.entity");
const class_validator_1 = require("class-validator");
const admin_type_enum_1 = require("../entities/admin-type.enum");
const dormitory_enum_1 = require("../../dormitory/entity/dormitory.enum");
class CreateAdminDto extends (0, swagger_1.PickType)(admin_entity_1.Admin, ['login', 'password', 'fullname', 'isShow', 'position', 'phone']) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ enumName: 'AdminRole', enum: admin_type_enum_1.AdminType, description: 'Тип администратора' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "adminType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ enumName: 'DormName', enum: dormitory_enum_1.DormitoryEnum, description: 'общежитие студента' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "dormitory_name", void 0);
exports.CreateAdminDto = CreateAdminDto;
//# sourceMappingURL=create-admin.dto.js.map