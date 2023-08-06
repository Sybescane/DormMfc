import { User } from "../entities/user.entity";
import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";
declare const CreateUserDto_base: import("@nestjs/common").Type<Pick<User, "personalNumber" | "fullname" | "gender" | "citizenship" | "faculty" | "phone" | "educationLevel">>;
export declare class CreateUserDto extends CreateUserDto_base {
    dormitory_name: DormitoryEnum;
    recordDatetime: string;
}
export {};
