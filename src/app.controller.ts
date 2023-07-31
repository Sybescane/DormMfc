import { Controller, UseGuards, Post, Body } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { RecordService } from "./user/record.service";
import { AuthUserGuard } from "./user/auth-user.guard";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { RecordStartDto } from "./user/dto/record-start.dto";
import { UpdateUserDto } from "./user/dto/update-user.dto";

@ApiTags('Запросы пользователя')
@Controller()
export class AppController{
    constructor(private readonly userService: UserService, private readonly recordService: RecordService){}

    @UseGuards(AuthUserGuard)
    @ApiBody({schema: {properties: {email: {type: 'string', example: 'm2110501@edu.misis.ru'}}}})
    @Post('start-recording')
    async startRecord(@Body('email')email: string): Promise<RecordStartDto>{
        return await this.recordService.startRecord(email)
    }

    @UseGuards(AuthUserGuard)
    @Post('take-time')
    async takeTime(@Body() dto: UpdateUserDto){
        return await this.userService.update(dto)
    }}