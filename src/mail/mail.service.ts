import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmMail(name, email: string, code): Promise<void> {
    await this.mailerService.sendMail({
      to: 'aleksandrpopov_2003@mail.ru',
      subject: 'Test Nest mailer',
      template: './confirmation',
      context: {
        name,
        code,
      }
    });
  }
}