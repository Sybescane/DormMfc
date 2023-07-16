import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMailerConfig } from 'configurations/mailer.config';

@Global()
@Module({
  imports: [MailerModule.forRootAsync(getMailerConfig()),],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
