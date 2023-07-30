import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthUserGuard } from "./auth-user.guard";
import { UserService } from "./user.service";
import { RecordService } from "./record.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { RecordStartDto } from "./dto/record-start.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('user')
@ApiTags('Контроллер регистрации')
export class UserController{
    constructor(private readonly userService: UserService, private readonly recordService: RecordService){}

    @UseGuards(AuthUserGuard)
    @ApiBody({schema: {properties: {email: {type: 'string', example: 'm2110501@edu.misis.ru'}}}})
    @Post('start-record')
    async startRecord(@Body('email')email: string): Promise<RecordStartDto>{
        return await this.recordService.startRecord(email)
    }

    @UseGuards(AuthUserGuard)
    @Post('take-time')
    takeTime(@Body() dto: UpdateUserDto){
        this.userService.update(dto)
    }
}
