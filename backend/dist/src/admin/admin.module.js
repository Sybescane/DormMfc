"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const admin_role_guard_1 = require("./admin-role.guard");
const core_1 = require("@nestjs/core");
const admin_entity_1 = require("./entities/admin.entity");
const user_module_1 = require("../user/user.module");
const dormitory_module_1 = require("../dormitory/dormitory.module");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => user_module_1.UserModule), dormitory_module_1.DormitoryModule, typeorm_1.TypeOrmModule.forFeature([admin_entity_1.Admin])],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService, jwt_1.JwtService, admin_role_guard_1.AdminRoleGuard, core_1.Reflector],
        exports: [admin_service_1.AdminService]
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map