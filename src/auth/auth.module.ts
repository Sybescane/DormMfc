import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/mail/mail.module';
import { AuthService } from './auth.service';
import { VerificationService } from './verification.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [MailModule, UserModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, VerificationService, UserService]
})
export class AuthModule {}
