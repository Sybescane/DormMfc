import { Controller, Post, Body, Get } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { MailService } from 'src/mail/mail.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly mailService: MailService,
    private readonly verificationService: VerificationService,
  ) {}

  @Get('sendTest')
  sendMail(){
      return this.mailService.sendMail();
  }



  // @Post('send-code')
  // async sendVerificationCode(@Body('email') email: string): Promise<void> {
  //   const code = this.verificationService.generateCode();
  //   this.verificationService.storeCode(email, code);

  //   const subject = 'Verification Code';
  //   const text = `Your verification code is: ${code}`;
  //   await this.mailService.sendMail(email, subject, text);
  // }

  @Post('verify')
  async verifyCode(
    @Body('email') email: string,
    @Body('code') code: string,
  ): Promise<{ success: boolean }> {
    const storedCode = this.verificationService.getCode(email);

    if (storedCode === code) {
      this.verificationService.deleteCode(email);
      return { success: true };
    }

    return { success: false };
  }
}