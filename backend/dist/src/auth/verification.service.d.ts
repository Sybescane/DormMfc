import { UserService } from 'src/user/user.service';
export declare class VerificationService {
    private readonly userService;
    constructor(userService: UserService);
    generateCode(): Promise<string>;
    storeCode(email: string, code: string): Promise<void>;
    checkCode(email: string, code: string): Promise<any>;
    deleteCode(email: string): Promise<void>;
}
