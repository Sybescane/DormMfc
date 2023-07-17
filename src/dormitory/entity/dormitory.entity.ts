import { Collection, Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "src/admin/entities/admin.entity";
import { User } from "../../user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('dormitories')
export class Dormitory{

    @ApiProperty({example: 1, description: 'уникальный идентификатор'})
    @PrimaryGeneratedColumn({name: 'dormitory_id'})
    dormitoryId: number;

    @ApiProperty({example: 'M-1', description: 'название общежития'})
    @Column({unique: true})
    name: "M-1" | "M-2" | "M-3"| "M-4" | "Г-1" | "Г-2" | "ДК" | "ДСГ";

    @ApiProperty({example: 'ул. Профсоюзная д.83к1', description: 'адрес общежития'})

    @Column({unique: true})
    address: string

    @ApiProperty({example: 'В это общежитие есть то и то', description: 'описание общежития'})
    @Column()
    description: string;

    @OneToMany(() => Admin, (admin: Admin) => admin.adminId)
    admins: Admin[]

    @OneToMany(() => User, (user: User) => user.dormitory)
    users: User[]
}