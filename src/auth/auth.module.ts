import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/mail/mail.module';
import { AuthService } from './auth.service';
import { VerificationService } from './verification.service';

@Module({
  imports: [MailModule],
  controllers: [AuthController],
  providers: [AuthService, VerificationService]
})
export class AuthModule {}
