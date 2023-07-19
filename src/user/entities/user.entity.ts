import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./gender.enum";
import { Dormitory } from "../../dormitory/entity/dormitory.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Record } from "src/record/entity/record.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({name: 'user_id'})
    userId: number;

    @ApiProperty({type: 'number', example: 2110501, description: 'Номер личного дела МИСИС'})
    @Column({unique: true, name: 'personal_number'})
    personalNumber: number;

    @ApiProperty({type: 'string', example: 'Иванов Иван Иванович', description: 'ФИО студента'})
    @Column()
    fullname: string;

    @ApiProperty({examples: ['Мужской', 'Женский'], description: 'пол студента'})
    @Column({
        type: 'enum',
        enum: Gender,
        nullable: true
    })
    gender: Gender;

    @ApiProperty({example: 'Россия', description: 'Гражданство студента'})
    @Column({
        nullable: true
    })
    citizenship: string;


    @ApiProperty({example: 'ИТКН', description: 'Факультет студента'})
    @Column({
        nullable: true
    })
    faculty: string

    @ApiProperty({example: '+7(999)888-77-66', description: 'Номер телефона студента'})
    @Column({
        nullable: true
    })
    phone: string;

    @ApiProperty({example: '123456', description: 'Код подтверждения с почты'})
    @Column({
        name: 'code_confirm',
        nullable: true
    })
    codeConfirm: string;

    @ManyToOne(() => Dormitory, (dorm: Dormitory) => dorm.users)
    @JoinColumn({
        name: 'dormitory_id'
    })
    dormitory: Dormitory

    @OneToOne(() => Record, (record: Record) => record.user)
    @JoinColumn({
        name: 'record_id',
        // referencedColumnName: 'user_id'
    })
    record: Record;


    static GetEmailFromNumber(personalNumber: number){
        return 'm' + personalNumber + '@edu.misis.ru';
    }

    static GetNumberFromEmail(email: string): number | null {
        const regex = /^m(\d{7})@edu\.misis\.ru$/;
        const matches = email.match(regex);
      
        if (matches && matches.length > 1) {
          return parseInt(matches[1]);
        } else {
          return null;
        }
      }
}
