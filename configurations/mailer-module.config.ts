import { MailerOptions } from "@nestjs-modules/mailer";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ConfigService } from "@nestjs/config";

const MailerConfig = async (
    configService: ConfigService
) : Promise<MailerOptions> =>({
    transport: {
        host: configService.get('mail_host'),
        port: configService.get('mail_port'),
        secure: true,
        auth: {
            user: configService.get('mail_user'),
            pass: configService.get('mail_pass'),
        }
      },
    defaults: {
        from: configService.get('mail_from')
    }
})

export const getMailerConfig = (): MailerAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => MailerConfig(config)
})