import { AdminType } from "./admin-type.enum";
import { Dormitory } from "src/dormitory/entity/dormitory.entity";
export declare class Admin {
    adminId: number;
    login: string;
    password: string;
    fullname: string;
    isShow: boolean;
    position: string;
    phone: string;
    adminType: AdminType;
    dormitory: Dormitory;
}
