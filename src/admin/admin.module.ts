import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';
import { DormitoryService } from 'src/dormitory/dormitory.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AdminRoleGuard } from './admin-role.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User, Dormitory])],
  controllers: [AdminController],
  providers: [AdminService, DormitoryService, JwtService ,UserService, {
    provide: APP_GUARD,
    useClass: AdminRoleGuard,
  },
  Reflector,]
})
export class AdminModule {}
