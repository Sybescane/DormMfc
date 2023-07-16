import { ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"

const TypeOrmConfig = async (
    configService: ConfigService
) : Promise<TypeOrmModuleOptions> =>(
    configService.get('database')
)

export const getTypeormConfig = (): TypeOrmModuleAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => TypeOrmConfig(config)
})