"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeTimeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const update_user_dto_1 = require("./update-user.dto");
class TakeTimeDto extends (0, swagger_1.PickType)(update_user_dto_1.UpdateUserDto, ['email', 'recordDatetime']) {
}
exports.TakeTimeDto = TakeTimeDto;
//# sourceMappingURL=take-time.dto.js.map