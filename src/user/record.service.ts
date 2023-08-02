import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { AdminService } from "src/admin/admin.service";
import { RecordStartDto } from "./dto/record-start.dto";
import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";
import { ConfirmMailDto } from "./dto/confirm-mail.dto";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class RecordService{
    constructor(
        private readonly userService: UserService,
        private readonly adminService: AdminService,
        private readonly mailService: MailService){}

    async startRecord(email: string): Promise<RecordStartDto | any> {
        let result = new RecordStartDto()
        const user = await this.userService.findOneByEmail(email)
        if(user.recordDatetime != null){
            const {recordDatetime, ...other} = user
            return { email, recordDatetime, message: 'Пользователь уже записан'}
        }
        result.fullname = user.fullname
        result.email = email
        const {dormitoryId, ...dorm} = user.dormitory
        result.dormitory = dorm
        result.takenTime = await this.userService.getTakenTime(dorm.name)
        result.contacts = await this.adminService.getAdminsForShow(dorm.name)
        return result
    }
    
    async confirmMail(email: string):Promise<void>{
        const user = await this.userService.findOneByEmail(email)
        const contacts = await this.adminService.getAdminsForShow(user.dormitory.name)
        const result = new ConfirmMailDto()
        result.email = email
        result.recordDatetime = user.recordDatetime
        result.dormitory = user.dormitory
        result.contacts = contacts
        await this.mailService.sendConfirmMail(result)

    }
}