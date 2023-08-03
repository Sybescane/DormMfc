"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDormDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dormitory_entity_1 = require("../entity/dormitory.entity");
class CreateDormDto extends (0, swagger_1.PickType)(dormitory_entity_1.Dormitory, ['address', 'description', 'name']) {
}
exports.CreateDormDto = CreateDormDto;
//# sourceMappingURL=create-dorm.dto.js.map