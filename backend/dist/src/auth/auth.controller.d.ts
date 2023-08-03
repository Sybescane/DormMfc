import { VerificationService } from './verification.service';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-user.dto';
import { SignInAdminDto } from './dto/sign-admin.dto';
export declare class AuthController {
    private readonly verificationService;
    private readonly authService;
    constructor(verificationService: VerificationService, authService: AuthService);
    sendMail(email: string): Promise<void>;
    signInUser(dto: SignInUserDto): Promise<any>;
    signInAdmin(dto: SignInAdminDto): Promise<{
        access_token: string;
    }>;
}
