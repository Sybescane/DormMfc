import { Controller, Post, Body, Get } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from './auth.service';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly authService: AuthService
  ) {}

  @Post('send-code')
  @ApiBody({schema: {properties: {email: {type: 'string', example: 'm2110501@edu.misis.ru'}}}})
  sendMail(@Body('email') email: string){
      return this.authService.sendVerificationCode(email);
  }

  @Post('verify')
  @ApiBody({type: VerifyCodeDto})
  async verifyCode(
    @Body() dto: VerifyCodeDto
  ): Promise<{ success: boolean }> {
    return await this.authService.verifyCode(dto);
  }
}