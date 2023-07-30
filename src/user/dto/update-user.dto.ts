import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entities/user.entity';
import { IsDateString, IsEmail, IsNotEmpty } from 'class-validator';
import { DormitoryEnum } from 'src/dormitory/entity/dormitory.enum';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PickType(User, ['fullname', 'citizenship', 'gender', 'faculty', 'phone']) {
    @IsEmail()
    @ApiProperty({example: 'm2110501@edu.misis.ru', description: 'корпоративная почта МИСИС'})
    email:string;

    @Type(() => Date)
    recordDatetime: string;
    
    @ApiProperty({enum: DormitoryEnum, description: 'общежитие студента'})
    dormitory_name: DormitoryEnum;
}
