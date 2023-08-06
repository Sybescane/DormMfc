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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../mail/mail.service");
const verification_service_1 = require("./verification.service");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("argon2");
const admin_service_1 = require("../admin/admin.service");
let AuthService = class AuthService {
    constructor(mailService, verificationService, adminService, userService, jwtService) {
        this.mailService = mailService;
        this.verificationService = verificationService;
        this.adminService = adminService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async sendVerificationCode(email) {
        const personalNumber = user_entity_1.User.GetNumberFromEmail(email);
        if (personalNumber == null) {
            throw new common_1.BadRequestException('Это не корпоративная почта MISIS');
        }
        const user = await this.userService.findOneByEmail(email);
        if (user == null) {
            throw new common_1.BadRequestException('Вас нет в списках на заселение');
        }
        const code = await this.verificationService.generateCode();
        await this.verificationService.storeCode(email, code);
        await this.mailService.sendCodeMail(user.fullname, email, code);
    }
    async signInUser(dto) {
        const user = await this.userService.findOneByEmail(dto.email);
        if ((user === null || user === void 0 ? void 0 : user.codeConfirm) === null || user === null) {
            throw new common_1.UnauthorizedException();
        }
        if (!await (0, argon2_1.verify)(user === null || user === void 0 ? void 0 : user.codeConfirm, dto.code)) {
            throw new common_1.UnauthorizedException();
        }
        this.verificationService.deleteCode(dto.email);
        const payload = { sub: user.userId, email: user_entity_1.User.GetEmailFromNumber(user.personalNumber), type: 'user' };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async signInAdmin(dto) {
        const admin = await this.adminService.findOneByLogin(dto.login);
        if (!await (0, argon2_1.verify)(admin.password, dto.password)) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { sub: admin.login, roles: admin.adminType, type: 'admin' };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_1.MailService,
        verification_service_1.VerificationService,
        admin_service_1.AdminService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map