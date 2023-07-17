import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./gender.enum";
import { Dormitory } from "../../dormitory/entity/dormitory.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({name: 'user_id'})
    userId: number;

    @Column({unique: true, name: 'personal_number'})
    personalNumber: number;

    @Column()
    fullname: string;

    @Column({
        type: 'enum',
        enum: Gender,
        nullable: true
    })
    gender: Gender;

    @Column({
        nullable: true
    })
    citizenship: string;

    @Column({
        nullable: true
    })
    faculty: string

    @Column({
        nullable: true
    })
    phone: string;

    @Column({
        name: 'code_confirm',
        nullable: true
    })
    codeConfirm: string;

    @ManyToOne(() => Dormitory, (dorm: Dormitory) => dorm.users)
    dormitory: Dormitory

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
