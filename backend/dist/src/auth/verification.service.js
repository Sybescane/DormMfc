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
exports.VerificationService = void 0;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const user_service_1 = require("../user/user.service");
let VerificationService = class VerificationService {
    constructor(userService) {
        this.userService = userService;
    }
    async generateCode() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    }
    async storeCode(email, code) {
        const user = await this.userService.findOneByEmail(email);
        user.codeConfirm = await (0, argon2_1.hash)(code);
        this.userService.save(user);
    }
    async checkCode(email, code) {
        const user = await this.userService.findOneByEmail(email);
        if (!user || !user.codeConfirm) {
            return null;
        }
        if ((0, argon2_1.verify)(user.codeConfirm, code)) {
            return user;
        }
    }
    async deleteCode(email) {
        await new Promise((resolve) => setTimeout(resolve, 30000));
        const user = await this.userService.findOneByEmail(email);
        user.codeConfirm = null;
        await this.userService.save(user);
    }
};
VerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], VerificationService);
exports.VerificationService = VerificationService;
//# sourceMappingURL=verification.service.js.map