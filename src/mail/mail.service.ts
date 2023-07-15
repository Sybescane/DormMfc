import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService) {}

  async sendMail(): Promise<void> {
    await this.mailerService.sendMail({
      to: 'aleksandrpopov_2003@mail.ru',
      subject: 'Test Nest mailer',
      text: 'welcome'
    });
  }
}