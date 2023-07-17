import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdminType } from "./admin-type.enum";
import { Dormitory } from "src/dormitory/entity/dormitory.entity";

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
        name: 'is_show',
        default: false
    })
    isShow: boolean;

    @Column()
    position: string;

    @Column({
        type: 'enum',
        enum: AdminType,
        name: 'admin_type'
    })
    adminType: AdminType

    @ManyToOne(() => Dormitory, (dorm: Dormitory) => dorm.admins)
    dormitory: Dormitory
}
