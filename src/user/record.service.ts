import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { AdminService } from "src/admin/admin.service";
import { RecordStartDto } from "./dto/record-start.dto";
import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";

@Injectable()
export class RecordService{
    constructor(private readonly userService: UserService,
        private readonly adminService: AdminService){

    }

    async startRecord(email: string): Promise<RecordStartDto> {
        let result = new RecordStartDto()
        const user = await this.userService.findOneByEmail(email)
        result.fullname = user.fullname
        result.email = email
        const {dormitoryId, ...dorm} = user.dormitory
        result.dormitory = dorm
        result['takenTime'] = await this.userService.getTakenTime(dorm.name)
        result.contacts = await this.adminService.getAdminsForShow(dorm.name)
        return result
    }
    
}