import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';
import { DormitoryEnum } from 'src/dormitory/entity/dormitory.enum';
import { TakeTimeDto } from './dto/take-time.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly dormRepository;
    constructor(userRepository: Repository<User>, dormRepository: Repository<Dormitory>);
    create(dto: CreateUserDto): Promise<User>;
    findAllForAdmin(options: FindManyOptions<User>): Promise<User[]>;
    findOneByPersonalNumber(personalNumber: number): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    takeTime(dto: TakeTimeDto): Promise<User>;
    update(dto: UpdateUserDto): Promise<User>;
    remove(email: string): Promise<User>;
    save(user: User): Promise<void>;
    getTakenTime(dorm_name: DormitoryEnum): Promise<{
        time: Date;
    }[]>;
    getUserFromObject(item: any): Promise<User>;
}
