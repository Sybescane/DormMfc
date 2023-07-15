import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./gender.enum";
import { Dormitory } from "../../admin/entities/dormitory.entity";

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
}
