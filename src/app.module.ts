import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import config from '../configurations/env.config';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => config.get('database'),
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [config]
  }),
  AuthModule,
  UserModule,
  AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
