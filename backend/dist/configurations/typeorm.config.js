"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const configService = new config_1.ConfigService();
const ormConfig = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'GoodZone',
    username: 'postgres',
    password: '1234567890',
    entities: ['dist/src/**/**/*.entity.js'],
    logging: true,
    synchronize: false,
    migrationsTableName: 'migrations',
    migrations: ['src/migrations/*{.js,.ts}'],
});
exports.default = ormConfig;
//# sourceMappingURL=typeorm.config.js.map