import { Collection, Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DormitoryEnum } from "./dormitory.enum";
import { Admin } from "src/admin/entities/admin.entity";
import { User } from "./user.entity";

@Entity('dormitories')
export class Dormitory{
    @PrimaryGeneratedColumn({name: 'dormitory_id'})
    dormitoryId: number;

    @Column({
        type: 'enum',
        enum: DormitoryEnum
    })
    name: DormitoryEnum

    @Column({unique: true})
    address: string

    @OneToMany(() => Admin, (admin: Admin) => admin.adminId)
    admins: Admin[]

    @OneToMany(() => User, (user: User) => user.dormitory)
    users: User[]
}