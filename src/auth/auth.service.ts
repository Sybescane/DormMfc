import { BadRequestException, Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { VerificationService } from './verification.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

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
        const user = await this.userService.findOne(personalNumber);
        if(user == null){
            throw new BadRequestException('Вас нет в списках на заселение')
        }    
        await this.mailService.sendConfirmMail(User.GetEmailFromNumber(user.personalNumber));
      }

}
