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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const admin_service_1 = require("../admin/admin.service");
const record_start_dto_1 = require("./dto/record-start.dto");
const confirm_mail_dto_1 = require("./dto/confirm-mail.dto");
const mail_service_1 = require("../mail/mail.service");
let RecordService = class RecordService {
    constructor(userService, adminService, mailService) {
        this.userService = userService;
        this.adminService = adminService;
        this.mailService = mailService;
    }
    async startRecord(email) {
        let result = new record_start_dto_1.RecordStartDto();
        const user = await this.userService.findOneByEmail(email);
        if (user.recordDatetime != null) {
            const recordDatetime = user.recordDatetime.toLocaleString();
            return { email, recordDatetime, message: 'Пользователь уже записан' };
        }
        result.fullname = user.fullname;
        result.email = email;
        const _a = user.dormitory, { dormitoryId } = _a, dorm = __rest(_a, ["dormitoryId"]);
        result.dormitory = dorm;
        result.takenTime = await this.userService.getTakenTime(dorm.name);
        result.contacts = await this.adminService.getAdminsForShow(dorm.name);
        return result;
    }
    async confirmMail(email) {
        const user = await this.userService.findOneByEmail(email);
        const contacts = await this.adminService.getAdminsForShow(user.dormitory.name);
        const result = new confirm_mail_dto_1.ConfirmMailDto();
        result.email = email;
        result.recordDatetime = user.recordDatetime;
        result.dormitory = user.dormitory;
        result.contacts = contacts;
        await this.mailService.sendConfirmMail(result);
    }
};
RecordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        admin_service_1.AdminService,
        mail_service_1.MailService])
], RecordService);
exports.RecordService = RecordService;
//# sourceMappingURL=record.service.js.map