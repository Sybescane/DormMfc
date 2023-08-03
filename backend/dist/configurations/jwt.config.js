"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtConfig = void 0;
const config_1 = require("@nestjs/config");
const JwtConfig = async (configService) => ({
    global: true,
    secret: configService.get('jwt'),
    signOptions: { expiresIn: '1h' }
});
const getJwtConfig = () => ({
    inject: [config_1.ConfigService],
    useFactory: (config) => JwtConfig(config)
});
exports.getJwtConfig = getJwtConfig;
//# sourceMappingURL=jwt.config.js.map