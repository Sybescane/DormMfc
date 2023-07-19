import { Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { WorkBook, readFile, utils } from 'xlsx';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Gender } from 'src/user/entities/gender.enum';
import { json } from 'stream/consumers';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Dormitory) private readonly dormRepository: Repository<Dormitory>,
    private readonly userService: UserService){}

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async parseFromExcel(){
    const workbook: WorkBook = readFile("src/files/RASPRED.xlsx");
    const worksheet = workbook.Sheets[workbook.SheetNames[1]];
    const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

    const headers = Object.values(jsonData[0]);
    const data = jsonData.slice(1);

    const result = data.map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });

    for(const obj of result){
      if(obj['Рег.номер'] != undefined && obj['Нуждаемость в общежитии'] != undefined){
        const user = await this.userService.getUserFromObject(obj)
        await this.userRepository.save(user)
      }
    }
  }

}
