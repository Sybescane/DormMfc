import { ApiProperty, PickType } from "@nestjs/swagger";
import { Admin } from "../entities/admin.entity";
import { IsNotEmpty } from "class-validator";
import { AdminType } from "../entities/admin-type.enum";
import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";

export class CreateAdminDto extends PickType(Admin, ['login', 'password', 'fullname', 'isShow', 'position'] as const){
    @ApiProperty({enumName: 'AdminRole', enum: ['Главный админ', 'Комендант', 'Студсовет'], description: 'Тип администратора'})
    adminType: AdminType

    @IsNotEmpty()
    @ApiProperty({enum: DormitoryEnum, description: 'общежитие студента'})
    dormitory_name: DormitoryEnum;
}
