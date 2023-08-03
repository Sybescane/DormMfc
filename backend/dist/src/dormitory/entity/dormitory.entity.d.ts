import { Admin } from "src/admin/entities/admin.entity";
import { User } from "../../user/entities/user.entity";
import { DormitoryEnum } from "./dormitory.enum";
export declare class Dormitory {
    dormitoryId: number;
    name: DormitoryEnum;
    address: string;
    description: string;
    admins: Admin[];
    users: User[];
}
