import { ApiProperty, PickType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto extends PickType(User, ['personalNumber', 'fullname', 'gender', 'citizenship', 'faculty', 'phone'] as const) {
    @IsNotEmpty()
    @ApiProperty({examples: ["M-1", "M-2", "M-3", "M-4", "Г-1" , "Г-2" , "ДК" , "ДСГ"], description: 'общежитие студента'})
    dormitory_name: "M-1" | "M-2" | "M-3"| "M-4" | "Г-1" | "Г-2" | "ДК" | "ДСГ";
}
