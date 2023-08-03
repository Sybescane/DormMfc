import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";
export declare class RecordStartDto {
    fullname: string;
    email: string;
    takenTime: {
        time: Date;
    }[];
    dormitory: {
        name: DormitoryEnum;
        address: string;
        description: string;
    };
    contacts: {
        fullname: string;
        position: string;
        phone: string;
    }[];
}
