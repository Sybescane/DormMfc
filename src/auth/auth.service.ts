import { BadRequestException, Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { VerificationService } from './verification.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { SendMailDto } from './dto/send-mail.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly mailService: MailService,
        private readonly verificationService: VerificationService,
        private readonly userService: UserService
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

      async verifyCode(dto: VerifyCodeDto){
        const storedCode = this.verificationService.checkCode(dto.email, dto.code);

        if (storedCode) {
            this.verificationService.deleteCode(dto.email);
            return { success: true };
        }

        return { success: false };
      }

}
