import { Admin } from "../entities/admin.entity";
import { AdminType } from "../entities/admin-type.enum";
import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";
declare const CreateAdminDto_base: import("@nestjs/common").Type<Pick<Admin, "fullname" | "phone" | "login" | "password" | "isShow" | "position">>;
export declare class CreateAdminDto extends CreateAdminDto_base {
    adminType: AdminType;
    dormitory_name: DormitoryEnum;
}
export {};
