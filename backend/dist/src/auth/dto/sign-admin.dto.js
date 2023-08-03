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
exports.SignInAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SignInAdminDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IvanovII', description: 'логин для входа в админ панель' }),
    __metadata("design:type", String)
], SignInAdminDto.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ваш пароль для входа в админ панель' }),
    __metadata("design:type", String)
], SignInAdminDto.prototype, "password", void 0);
exports.SignInAdminDto = SignInAdminDto;
//# sourceMappingURL=sign-admin.dto.js.map