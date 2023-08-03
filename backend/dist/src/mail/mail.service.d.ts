import { MailerService } from '@nestjs-modules/mailer';
import { ConfirmMailDto } from 'src/user/dto/confirm-mail.dto';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendCodeMail(name: string, email: string, code: string): Promise<void>;
    sendConfirmMail(data: ConfirmMailDto): Promise<void>;
}
