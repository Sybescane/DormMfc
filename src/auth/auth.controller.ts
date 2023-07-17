import { Controller, Post, Body, Get } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from './auth.service';
import { SendMailDto } from './dto/send-mail.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly authService: AuthService
  ) {}

  @Post('send-code')
  sendMail(@Body() sendMailDto: SendMailDto){
      return this.authService.sendVerificationCode(sendMailDto.email);
  }

  @Post('verify')
  async verifyCode(
    @Body() dto: VerifyCodeDto
  ): Promise<{ success: boolean }> {
    return await this.authService.verifyCode(dto);
  }
}