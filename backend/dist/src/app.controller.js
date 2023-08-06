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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user/user.service");
const record_service_1 = require("./user/record.service");
const auth_user_guard_1 = require("./user/auth-user.guard");
const swagger_1 = require("@nestjs/swagger");
const take_time_dto_1 = require("./user/dto/take-time.dto");
const mail_service_1 = require("./mail/mail.service");
let AppController = class AppController {
    constructor(userService, recordService, mailService) {
        this.userService = userService;
        this.recordService = recordService;
        this.mailService = mailService;
    }
    async startRecord(email) {
        return await this.recordService.startRecord(email);
    }
    async takeTime(dto) {
        return await this.userService.takeTime(dto);
    }
    async confirmRecord(email) {
        await this.recordService.confirmMail(email);
    }
    async freeTime(email) {
        await this.userService.removeRecord(email);
        return this.recordService.startRecord(email);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, swagger_1.ApiBody)({ schema: { properties: { email: { type: 'string', example: 'm2110501@edu.misis.ru' } } } }),
    (0, common_1.Post)('start-recording'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "startRecord", null);
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, common_1.Post)('take-time'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [take_time_dto_1.TakeTimeDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "takeTime", null);
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, swagger_1.ApiBody)({ schema: { properties: { email: { type: 'string', example: 'm2110501@edu.misis.ru' } } } }),
    (0, common_1.Post)('confirm-mail'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "confirmRecord", null);
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, common_1.Put)('free-time'),
    (0, swagger_1.ApiBody)({ schema: { properties: { email: { type: 'string', example: 'm2110501@edu.misis.ru' } } } }),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "freeTime", null);
AppController = __decorate([
    (0, swagger_1.ApiTags)('Запросы пользователя'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        record_service_1.RecordService,
        mail_service_1.MailService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map