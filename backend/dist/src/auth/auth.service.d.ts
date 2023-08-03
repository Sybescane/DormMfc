import { MailService } from 'src/mail/mail.service';
import { VerificationService } from './verification.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInAdminDto } from './dto/sign-admin.dto';
import { AdminService } from 'src/admin/admin.service';
export declare class AuthService {
    private readonly mailService;
    private readonly verificationService;
    private readonly adminService;
    private readonly userService;
    private readonly jwtService;
    constructor(mailService: MailService, verificationService: VerificationService, adminService: AdminService, userService: UserService, jwtService: JwtService);
    sendVerificationCode(email: string): Promise<void>;
    signInUser(dto: any): Promise<any>;
    signInAdmin(dto: SignInAdminDto): Promise<{
        access_token: string;
    }>;
}
