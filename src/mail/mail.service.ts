import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmMail(name: string, email: string, code: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Test Nest mailer',
      template: './confirmation',
      context: {
        name,
        code,
      }
    });
  }
}