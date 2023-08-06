import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';
import { DormitoryEnum } from 'src/dormitory/entity/dormitory.enum';
import { TakeTimeDto } from './dto/take-time.dto';
import { UserForAdminDto } from 'src/admin/dto/user-for-admin.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly dormRepository;
    constructor(userRepository: Repository<User>, dormRepository: Repository<Dormitory>);
    create(dto: CreateUserDto): Promise<UserForAdminDto>;
    findAllForAdmin(dorm_name?: DormitoryEnum): Promise<User[]>;
    findOneByPersonalNumber(personalNumber: number): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    takeTime(dto: TakeTimeDto): Promise<UserForAdminDto>;
    update(dto: UpdateUserDto): Promise<UserForAdminDto>;
    removeRecord(email: string): Promise<void>;
    save(user: User): Promise<void>;
    getTakenTime(dorm_name: DormitoryEnum): Promise<string[]>;
    getUserFromObject(item: any): Promise<User>;
}
