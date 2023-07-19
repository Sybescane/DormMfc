import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Dormitory])],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
