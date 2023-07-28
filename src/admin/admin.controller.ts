import { Controller, Get, Post, Body, Patch, UseGuards, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateDormDto } from '../dormitory/dto/create-dorm.dto';
import { Dormitory } from '../dormitory/entity/dormitory.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DormitoryService } from 'src/dormitory/dormitory.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAdminDto } from './dto/create-admin.dto';


@ApiTags('Действия администратора')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly dormService: DormitoryService,
    private readonly userService: UserService) {}

  @Post('create-user')
  @ApiBody({type: CreateUserDto})
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('update-user')
  @ApiBody({type: UpdateUserDto})
  updateUser(@Body() dto: UpdateUserDto){
    return this.userService.update(dto)
  }

  @Delete('delete-user')
  @ApiOperation({description: 'Создание общежития'})
  @ApiBody({schema: {properties: {email: {type: 'string', example: 'm2110501@edu.misis.ru'}}}})
  async deleteUser(@Body('email') email: string){
    return await this.userService.remove(email);
  }

  @Post('create-dorm')
  @ApiBody({type: CreateDormDto})
  createDorm(@Body() dto: CreateDormDto): Promise<Dormitory>{
    return this.dormService.createDorm(dto)
  }

  @Get('parseFromExcel')
  parseFromExcel(){
    return this.adminService.parseFromExcel();
  }

  @Post('create-admin')
  @ApiBody({type: CreateAdminDto})
  async createAdmin(@Body() dto: CreateAdminDto){
    return await this.adminService.createAdmin(dto)
  }
}
