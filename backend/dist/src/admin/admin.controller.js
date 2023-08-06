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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const swagger_1 = require("@nestjs/swagger");
const dormitory_service_1 = require("../dormitory/dormitory.service");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const user_service_1 = require("../user/user.service");
const update_user_dto_1 = require("../user/dto/update-user.dto");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const admin_guard_1 = require("./admin.guard");
const admin_type_enum_1 = require("./entities/admin-type.enum");
const admin_role_guard_1 = require("./admin-role.guard");
let AdminController = class AdminController {
    constructor(adminService, dormService, userService) {
        this.adminService = adminService;
        this.dormService = dormService;
        this.userService = userService;
    }
    async getUsers(login) {
        return await this.adminService.findAllUsers(login);
    }
    createUser(createUserDto) {
        return this.userService.create(createUserDto);
    }
    updateUser(dto) {
        return this.userService.update(dto);
    }
    async deleteUser(email) {
        return await this.userService.removeRecord(email);
    }
    parseFromExcel() {
        return this.adminService.parseFromExcel();
    }
    async createAdmin(dto) {
        return await this.adminService.createAdmin(dto);
    }
};
__decorate([
    (0, common_1.Get)('get-users'),
    (0, common_1.UseGuards)(admin_guard_1.AuthAdminGuard),
    __param(0, (0, common_1.Query)('login')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('create-user'),
    (0, common_1.UseGuards)(admin_guard_1.AuthAdminGuard, admin_role_guard_1.AdminRoleGuard),
    (0, common_1.SetMetadata)('roles', [admin_type_enum_1.AdminType.Main, admin_type_enum_1.AdminType.Dorm]),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)('update-user'),
    (0, common_1.UseGuards)(admin_guard_1.AuthAdminGuard, admin_role_guard_1.AdminRoleGuard),
    (0, common_1.SetMetadata)('roles', [admin_type_enum_1.AdminType.Main, admin_type_enum_1.AdminType.Dorm]),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('delete-record'),
    (0, common_1.UseGuards)(admin_guard_1.AuthAdminGuard, admin_role_guard_1.AdminRoleGuard),
    (0, common_1.SetMetadata)('roles', [admin_type_enum_1.AdminType.Main, admin_type_enum_1.AdminType.Dorm]),
    (0, swagger_1.ApiOperation)({ description: 'Создание общежития' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { email: { type: 'string', example: 'm2110501@edu.misis.ru' } } } }),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('parseFromExcel'),
    (0, common_1.UseGuards)(admin_guard_1.AuthAdminGuard, admin_role_guard_1.AdminRoleGuard),
    (0, common_1.SetMetadata)('roles', [admin_type_enum_1.AdminType.Main]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "parseFromExcel", null);
__decorate([
    (0, common_1.Post)('create-admin'),
    (0, common_1.UseGuards)(admin_guard_1.AuthAdminGuard, admin_role_guard_1.AdminRoleGuard),
    (0, common_1.SetMetadata)('roles', [admin_type_enum_1.AdminType.Main]),
    (0, swagger_1.ApiBody)({ type: create_admin_dto_1.CreateAdminDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
AdminController = __decorate([
    (0, swagger_1.ApiTags)('Действия администратора'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        dormitory_service_1.DormitoryService,
        user_service_1.UserService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map