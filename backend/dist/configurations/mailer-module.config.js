"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailerConfig = void 0;
const config_1 = require("@nestjs/config");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const MailerConfig = async (configService) => ({
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
    },
    template: {
        dir: 'src/mail/templates',
        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
        options: {
            strict: true,
        },
    }
});
const getMailerConfig = () => ({
    inject: [config_1.ConfigService],
    useFactory: (config) => MailerConfig(config)
});
exports.getMailerConfig = getMailerConfig;
//# sourceMappingURL=mailer-module.config.js.map