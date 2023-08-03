import { User } from '../entities/user.entity';
import { DormitoryEnum } from 'src/dormitory/entity/dormitory.enum';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Pick<User, "fullname" | "phone" | "gender" | "citizenship" | "faculty">>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    email: string;
    recordDatetime: string;
    dormitory_name: DormitoryEnum;
}
export {};
