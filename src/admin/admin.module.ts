import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';
import { DormitoryService } from 'src/dormitory/dormitory.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Dormitory])],
  controllers: [AdminController],
  providers: [AdminService, DormitoryService]
})
export class AdminModule {}
