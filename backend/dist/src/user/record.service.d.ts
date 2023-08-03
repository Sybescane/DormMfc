import { UserService } from "./user.service";
import { AdminService } from "src/admin/admin.service";
import { RecordStartDto } from "./dto/record-start.dto";
import { MailService } from "src/mail/mail.service";
export declare class RecordService {
    private readonly userService;
    private readonly adminService;
    private readonly mailService;
    constructor(userService: UserService, adminService: AdminService, mailService: MailService);
    startRecord(email: string): Promise<RecordStartDto | any>;
    confirmMail(email: string): Promise<void>;
}
