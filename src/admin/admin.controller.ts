import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/admin-dto/create-admin.dto';
import { UpdateAdminDto } from './dto/admin-dto/update-admin.dto';
import { CreateDormDto } from './dto/dorm-dto/create-dorm.dto';
import { DormitoryService } from './dormitory.service';
import { Dormitory } from './entities/dormitory.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('действия администратора')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly dormService: DormitoryService) {}


  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({description: 'Создание общежития'})
  @Post('createDorm')
  async createDorm(@Body() dto: CreateDormDto): Promise<Dormitory>{
    return await this.dormService.createDorm(dto)
  }


  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get('parseFromExcel')
  parseFromExcel(){
    return this.adminService.parseFromExcel();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

 
}
