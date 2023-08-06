import { CreateAdminDto } from './dto/create-admin.dto';
import { Repository } from 'typeorm';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from 'src/user/user.service';
import { Admin } from './entities/admin.entity';
import { AdminType } from './entities/admin-type.enum';
import { DormitoryService } from 'src/dormitory/dormitory.service';
import { DormitoryEnum } from 'src/dormitory/entity/dormitory.enum';
export declare class AdminService {
    private readonly adminRepository;
    private readonly dormService;
    private readonly userService;
    constructor(adminRepository: Repository<Admin>, dormService: DormitoryService, userService: UserService);
    createAdmin(dto: CreateAdminDto): Promise<{
        login: string;
        fullname: string;
        isShow: boolean;
        position: string;
        phone: string;
        adminType: AdminType;
    }>;
    findAll(): string;
    findOneByLogin(login: string): Promise<Admin | null>;
    update(id: number, updateAdminDto: UpdateAdminDto): string;
    remove(id: number): string;
    parseFromExcel(): Promise<void>;
    getAdminsForShow(dorm_name: DormitoryEnum): Promise<{
        fullname: string;
        position: string;
        phone: string;
    }[]>;
    findAllUsers(login: string): Promise<{}>;
}
