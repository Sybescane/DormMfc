"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DormitoryModule = void 0;
const common_1 = require("@nestjs/common");
const dormitory_service_1 = require("./dormitory.service");
const typeorm_1 = require("@nestjs/typeorm");
const dormitory_entity_1 = require("./entity/dormitory.entity");
let DormitoryModule = class DormitoryModule {
};
DormitoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([dormitory_entity_1.Dormitory])],
        providers: [dormitory_service_1.DormitoryService],
        exports: [dormitory_service_1.DormitoryService]
    })
], DormitoryModule);
exports.DormitoryModule = DormitoryModule;
//# sourceMappingURL=dormitory.module.js.map