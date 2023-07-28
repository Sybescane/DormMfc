import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthAdminGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService,
        private readonly configService: ConfigService){}  
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
      let result = true
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
          throw new UnauthorizedException("Нет токена");
        }
        try {
          const payload = await this.jwtService.verifyAsync(
            token,
            {
              secret: this.configService.get('jwt')
            }
          );
          // 💡 We're assigning the payload to the request object here
          // so that we can access it in our route handlers
          if(payload.type != 'admin'){
            result = false
            throw new UnauthorizedException()
          }
          request['user'] = payload;
        } catch{
          throw new UnauthorizedException("У вас нет на это прав")
        }
        return result;
      }
    
      private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}