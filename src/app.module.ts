import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import config from '../configurations/env.config';
import { MailModule } from './mail/mail.module';
import { getTypeormConfig } from 'configurations/typeorm-module.config';
import { DormitoryModule } from './dormitory/dormitory.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(getTypeormConfig()),
  ConfigModule.forRoot({isGlobal: true, load: [config]}),
  AuthModule,
  UserModule,
  AdminModule,
  MailModule,
  DormitoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
