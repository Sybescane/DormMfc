import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AdminType } from "./admin-type.enum";
import { AdminDormitory } from "./admin-dorm.enum";

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn({name: 'admin_id'})
    adminId: number;

    @Column({unique: true})
    login: string;

    @Column()
    password: string;

    @Column()
    fullname: string;

    @Column({
        type: 'enum',
        enum: AdminType,
        name: 'admin_type'
    })
    adminType: AdminType

    @Column({
        type: 'enum',
        enum: AdminDormitory,
    })
    dormitory: AdminDormitory
}
