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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../entities/user.entity");
const class_validator_1 = require("class-validator");
const dormitory_enum_1 = require("../../dormitory/entity/dormitory.enum");
const class_transformer_1 = require("class-transformer");
class CreateUserDto extends (0, swagger_1.PickType)(user_entity_1.User, ['personalNumber', 'fullname', 'gender', 'citizenship', 'faculty', 'phone']) {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ enum: dormitory_enum_1.DormitoryEnum, description: 'общежитие студента' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "dormitory_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '2023-08-25T10:00:00', description: 'Время заселения' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", String)
], CreateUserDto.prototype, "recordDatetime", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map