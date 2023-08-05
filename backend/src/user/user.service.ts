import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindManyOptions, IsNull, Not, Repository } from 'typeorm';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';
import { Gender } from './entities/gender.enum';
import { DormitoryEnum } from 'src/dormitory/entity/dormitory.enum';
import { TakeTimeDto } from './dto/take-time.dto';
import { EducationLevelEnum } from './entities/education.enum';
import { UserForAdminDto } from 'src/admin/dto/user-for-admin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Dormitory) private readonly dormRepository: Repository<Dormitory>
  ){}

  async create(dto: CreateUserDto) {
    const oldUser = await this.findOneByPersonalNumber(dto.personalNumber)
    if(oldUser != null){
      throw new BadRequestException('Этот пользователь уже существует')
    }
    const newUser = this.userRepository.create()
    newUser.personalNumber = dto.personalNumber
    newUser.fullname = dto.fullname
    newUser.gender = dto.gender
    newUser.citizenship = dto.citizenship
    newUser.faculty = dto.faculty
    newUser.phone = dto.phone
    newUser.educationLevel = dto.educationLevel
    const oldRecord = await this.userRepository.find({
      where: {
        dormitory: {
          name: dto.dormitory_name
        },
      recordDatetime: new Date(dto.recordDatetime)
      }
    })
    if(oldRecord.length > 0){
      throw new BadRequestException('Это время уже занято')
    }
    newUser.recordDatetime = new Date(dto.recordDatetime)
    newUser.dormitory = await this.dormRepository.findOneBy({
      name: dto.dormitory_name
    });
    const savedUser = await this.userRepository.save(newUser)
    const userRes: UserForAdminDto = new UserForAdminDto(savedUser)
    return userRes
  }

  async findAllForAdmin(dorm_name: DormitoryEnum = null): Promise<User[]> {
    if( dorm_name == null){
      return await this.userRepository.find({
        where: {
          recordDatetime: Not(IsNull())
        },
        relations: {
          dormitory: true
        }
      })
    }
    else{
      return await this.userRepository.find({
        where: {
          dormitory: {
            name: dorm_name
          },
          recordDatetime: Not(IsNull())
        },
        relations: {
          dormitory: true
        }
      })
    }
  }

  async findOneByPersonalNumber(personalNumber: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        personalNumber: personalNumber
      },
      relations: {
        dormitory: true
      }
    })
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const personalNumber = User.GetNumberFromEmail(email);
    const user = await this.findOneByPersonalNumber(personalNumber)
    return user;
  }

  async takeTime(dto: TakeTimeDto){
    const user = await this.findOneByEmail(dto.email)
    if(user == null){
      throw new BadRequestException('Такой студент не заселяется')
    }
    const takenTime = await this.getTakenTime(user.dormitory.name)
    if(takenTime.some(item => item.time.getTime() === new Date(dto.recordDatetime).getTime())){
      throw new BadRequestException('Это время уже заняли')
    }
    user.recordDatetime = new Date(dto.recordDatetime) ?? user.recordDatetime
    const userFromDB = await this.userRepository.save(user)
    userFromDB.recordDatetime.setHours(userFromDB.recordDatetime.getHours() + 3);
    return userFromDB
  }

  async update(dto: UpdateUserDto) {
    const user = await this.findOneByEmail(dto.email)
    if(user == null){
      throw new BadRequestException('Такой студент не заселяется')
    }
    const takenTime = await this.getTakenTime(user.dormitory.name)
    if(takenTime.some(item => item.time.getTime() === new Date(dto.recordDatetime).getTime())){
      throw new BadRequestException('Это время уже заняли')
    }
    user.gender = dto.gender ?? user.gender
    user.fullname = dto.fullname ?? user.fullname
    user.citizenship = dto.citizenship ?? user.citizenship
    user.faculty = dto.faculty ?? user.faculty
    user.phone = dto.phone ?? user.phone
    user.recordDatetime = new Date(dto.recordDatetime) ?? user.recordDatetime
    user.dormitory = await this.dormRepository.findOneBy({
      name: dto.dormitory_name
    })
    const savedUser = await this.userRepository.save(user)
    const userRes = new UserForAdminDto(savedUser)
    return userRes
  }

  async remove(email: string) {
    const user = await this.findOneByEmail(email)
    if(user == null){
      throw new BadRequestException('Такого пользователя нет в базе данных на заселение')
    }
    return await this.userRepository.remove(user)
  }

  async save(user:User){
    await this.userRepository.save(user)
  }

  async getTakenTime(dorm_name: DormitoryEnum){
    const users = await this.userRepository.find({
      where: {
        dormitory: {
          name: dorm_name
        },
        recordDatetime: Not(IsNull())
      }
    })
    users.forEach((user) => {
      user.recordDatetime.setHours(user.recordDatetime.getHours() + 3)
    });
    return users.map((user) => ({
      time: user.recordDatetime
    }))
  }

  async getUserFromObject(item: any){
    const oldUser = await this.findOneByPersonalNumber(item['Рег.номер'])
    let newUser = this.userRepository.create()
    if(oldUser != null){
      newUser = oldUser
    }
    newUser.fullname = item['ФИО']
    newUser.personalNumber = parseInt(item['Рег.номер'])
    newUser.gender = item['Пол'] as Gender ?? null
    // if(Gender.female == item['Пол']){
    //   newUser.gender = item['Пол']
    // }
    // else if(Gender.male == item['Пол']){
    //   newUser.gender = item['Пол']
    // }
    newUser.citizenship = item['Гражданство']
    newUser.faculty = item['Подразделение']
    newUser.phone = item['Телефон']
    newUser.educationLevel = item['Уровень подготовки'] as EducationLevelEnum
    if(item["Рекомендуемое общежитие"] != null){
      newUser.dormitory = await this.dormRepository.findOneBy({
        name: item['Рекомендуемое общежитие']
      });
    }
    else{
      newUser.dormitory = null
    }
    return newUser
  }
}

