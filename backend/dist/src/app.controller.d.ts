import { UserService } from "./user/user.service";
import { RecordService } from "./user/record.service";
import { RecordStartDto } from "./user/dto/record-start.dto";
import { TakeTimeDto } from "./user/dto/take-time.dto";
import { MailService } from "./mail/mail.service";
export declare class AppController {
    private readonly userService;
    private readonly recordService;
    private readonly mailService;
    constructor(userService: UserService, recordService: RecordService, mailService: MailService);
    startRecord(email: string): Promise<RecordStartDto>;
    takeTime(dto: TakeTimeDto): Promise<import("./user/entities/user.entity").User>;
    confirmRecord(email: string): Promise<void>;
}
