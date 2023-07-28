import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
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

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.code);
  }
}