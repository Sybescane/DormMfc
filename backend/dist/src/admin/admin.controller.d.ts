import { AdminService } from './admin.service';
import { DormitoryService } from 'src/dormitory/dormitory.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminType } from './entities/admin-type.enum';
export declare class AdminController {
    private readonly adminService;
    private readonly dormService;
    private readonly userService;
    constructor(adminService: AdminService, dormService: DormitoryService, userService: UserService);
    getUsers(login: string): Promise<{}>;
    createUser(createUserDto: CreateUserDto): Promise<import("./dto/user-for-admin.dto").UserForAdminDto>;
    updateUser(dto: UpdateUserDto): Promise<import("./dto/user-for-admin.dto").UserForAdminDto>;
    deleteUser(email: string): Promise<void>;
    parseFromExcel(): Promise<void>;
    createAdmin(dto: CreateAdminDto): Promise<{
        login: string;
        fullname: string;
        isShow: boolean;
        position: string;
        phone: string;
        adminType: AdminType;
    }>;
}
