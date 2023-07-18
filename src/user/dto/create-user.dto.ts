import { PickType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto extends PickType(User, ['personalNumber', 'fullname', 'gender', 'citizenship', 'faculty', 'phone'] as const) {
    @IsNotEmpty()
    dormitory_name: string;
}
