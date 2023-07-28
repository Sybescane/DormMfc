import { ApiProperty, PickType } from "@nestjs/swagger";
import { Admin } from "../entities/admin.entity";
import { IsNotEmpty } from "class-validator";
import { AdminType } from "../entities/admin-type.enum";

export class CreateAdminDto extends PickType(Admin, ['login', 'password', 'fullname', 'isShow', 'position'] as const){
    @ApiProperty({enumName: 'AdminRole', enum: ['Главный админ', 'Комендант', 'Студсовет'], description: 'Тип администратора'})
    adminType: AdminType

    @IsNotEmpty()
    @ApiProperty({enum: ["M-1", "M-2", "M-3", "M-4", "Г-1" , "Г-2" , "ДК" , "ДСГ"], description: 'общежитие студента'})
    dormitory_name: "M-1" | "M-2" | "M-3"| "M-4" | "Г-1" | "Г-2" | "ДК" | "ДСГ";
}
