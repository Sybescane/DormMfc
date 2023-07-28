import { ApiProperty, PickType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { IsNotEmpty } from "class-validator";
import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";

export class CreateUserDto extends PickType(User, ['personalNumber', 'fullname', 'gender', 'citizenship', 'faculty', 'phone'] as const) {
    @IsNotEmpty()
    @ApiProperty({enum: DormitoryEnum, description: 'общежитие студента'})
    dormitory_name: DormitoryEnum;
}
