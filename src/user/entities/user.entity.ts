import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./gender.enum";
import { Dormitory } from "./dormitory.entity";
import { DormitoryEnum } from "./dormitory.enum";

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


    @ManyToOne(() => Dormitory, (dorm: Dormitory) => dorm.users)
    dormitory: Dormitory

    // SetDormitory(dorm: string){
    //     switch(dorm){
    //         case DormitoryEnum.M1:
    //             this.dormitory = DormitoryEnum.M1
    //             break;
    //         case Dormitory.M2:
    //             this.dormitory = Dormitory.M2
    //             break;
    //         case Dormitory.M3:
    //             this.dormitory = Dormitory.M3
    //             break;
    //         case Dormitory.M4:
    //             this.dormitory = Dormitory.M4
    //             break;
    //         case Dormitory.G1:
    //             this.dormitory = Dormitory.G1
    //             break;
    //         case Dormitory.G2:
    //             this.dormitory = Dormitory.G2
    //             break;
    //         case Dormitory.DSG:
    //             this.dormitory = Dormitory.DSG
    //             break;
    //     }
    // }
}
