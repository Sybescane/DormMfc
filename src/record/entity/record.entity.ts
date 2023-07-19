import { Dormitory } from "src/dormitory/entity/dormitory.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('records')
export class Record{
    @PrimaryGeneratedColumn({name: 'record_id'})
    recordId: number

    @Column()
    datetime: Date;

    @OneToOne(() => User, (user: User) => user.record)
    @JoinColumn({
        name: 'user_id',
        // referencedColumnName: 'record_id'
    })
    user: User;

    @ManyToOne(() => Dormitory, (dorm: Dormitory) => dorm.records)
    @JoinColumn({
        name: 'dormitory_id'
    })
    dormitory: Dormitory;
}