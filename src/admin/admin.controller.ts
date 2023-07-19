import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateDormDto } from '../dormitory/dto/create-dorm.dto';
import { Dormitory } from '../dormitory/entity/dormitory.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DormitoryService } from 'src/dormitory/dormitory.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';


@ApiTags('действия администратора')
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
  @ApiOperation({description: 'Создание общежития'})
  @Post('createDorm')
  async createDorm(@Body() dto: CreateDormDto): Promise<Dormitory>{
    return await this.dormService.createDorm(dto)
  }


  // @Get()
  // findAll() {
  //   return this.adminService.findAll();
  // }

  @Get('parseFromExcel')
  parseFromExcel(){
    return this.adminService.parseFromExcel();
  }
  
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }

 
}
