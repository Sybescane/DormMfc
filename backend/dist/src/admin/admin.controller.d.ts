import { AdminService } from './admin.service';
import { CreateDormDto } from '../dormitory/dto/create-dorm.dto';
import { Dormitory } from '../dormitory/entity/dormitory.entity';
import { DormitoryService } from 'src/dormitory/dormitory.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
export declare class AdminController {
    private readonly adminService;
    private readonly dormService;
    private readonly userService;
    constructor(adminService: AdminService, dormService: DormitoryService, userService: UserService);
    getUsers(login: string): Promise<{}>;
    createUser(createUserDto: CreateUserDto): Promise<import("../user/entities/user.entity").User>;
    updateUser(dto: UpdateUserDto): Promise<import("../user/entities/user.entity").User>;
    deleteUser(email: string): Promise<import("../user/entities/user.entity").User>;
    createDorm(dto: CreateDormDto): Promise<Dormitory>;
    parseFromExcel(): Promise<void>;
    createAdmin(dto: CreateAdminDto): Promise<import("./entities/admin.entity").Admin>;
}
