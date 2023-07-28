import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { VerificationService } from './verification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'configurations/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule,
    TypeOrmModule.forFeature([User, Dormitory]), 
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [AuthController],
  providers: [AuthService, VerificationService]
})
export class AuthModule {}
