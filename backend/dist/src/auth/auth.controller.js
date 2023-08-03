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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const verification_service_1 = require("./verification.service");
const auth_service_1 = require("./auth.service");
const sign_user_dto_1 = require("./dto/sign-user.dto");
const swagger_1 = require("@nestjs/swagger");
const sign_admin_dto_1 = require("./dto/sign-admin.dto");
let AuthController = class AuthController {
    constructor(verificationService, authService) {
        this.verificationService = verificationService;
        this.authService = authService;
    }
    sendMail(email) {
        return this.authService.sendVerificationCode(email);
    }
    async signInUser(dto) {
        return await this.authService.signInUser(dto);
    }
    async signInAdmin(dto) {
        return await this.authService.signInAdmin(dto);
    }
};
__decorate([
    (0, common_1.Post)('send-code'),
    (0, swagger_1.ApiBody)({ schema: { properties: { email: { type: 'string', example: 'm2110501@edu.misis.ru' } } } }),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sendMail", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_user_dto_1.SignInUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInUser", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login-admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_admin_dto_1.SignInAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInAdmin", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Аутентификация'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [verification_service_1.VerificationService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map