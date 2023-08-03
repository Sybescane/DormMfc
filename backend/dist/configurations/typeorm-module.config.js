"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeormConfig = void 0;
const config_1 = require("@nestjs/config");
const TypeOrmConfig = async (configService) => (Object.assign(Object.assign({}, configService.get('database')), { autoLoadEntities: true, entities: ['dist/src/**/*.entity.js'] }));
const getTypeormConfig = () => ({
    inject: [config_1.ConfigService],
    useFactory: (config) => TypeOrmConfig(config)
});
exports.getTypeormConfig = getTypeormConfig;
//# sourceMappingURL=typeorm-module.config.js.map