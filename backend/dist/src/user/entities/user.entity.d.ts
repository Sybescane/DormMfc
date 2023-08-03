import { Gender } from "./gender.enum";
import { Dormitory } from "../../dormitory/entity/dormitory.entity";
export declare class User {
    userId: number;
    personalNumber: number;
    fullname: string;
    gender: Gender;
    citizenship: string;
    faculty: string;
    phone: string;
    codeConfirm: string;
    recordDatetime: Date;
    dormitory: Dormitory;
    static GetEmailFromNumber(personalNumber: number): string;
    static GetNumberFromEmail(email: string): number | null;
}
