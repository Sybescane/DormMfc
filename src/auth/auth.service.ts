import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { VerificationService } from './verification.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private readonly mailService: MailService,
        private readonly verificationService: VerificationService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async sendVerificationCode(email: string): Promise<void>{
        const personalNumber = User.GetNumberFromEmail(email)
        if(personalNumber == null){
            throw new BadRequestException('Это не корпоративная почта MISIS')
        }
        const user = await this.userService.findOneByEmail(email);
        if(user == null){
            throw new BadRequestException('Вас нет в списках на заселение')
        }
        
        const code = await this.verificationService.generateCode();
        await this.verificationService.storeCode(email, code)
        await this.mailService.sendConfirmMail(user.fullname, email, code);
    }

    async signIn(email: string, code: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (!verify(user?.codeConfirm, code)) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.fullname };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
      }
}
