import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';
import { Gender } from './entities/gender.enum';

@Injectable()
export class UserService {
constructor(
  @InjectRepository(User) private readonly userRepository: Repository<User>,
  @InjectRepository(Dormitory) private readonly dormRepository: Repository<Dormitory>
){}

  async create(dto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create()
    newUser.personalNumber = dto.personalNumber
    newUser.fullname = dto.fullname
    newUser.gender = dto.gender
    newUser.citizenship = dto.citizenship
    newUser.faculty = dto.faculty
    newUser.phone = dto.phone
    newUser.dormitory = await this.dormRepository.findOneBy({
      name: dto.dormitory_name
    });
    return await this.userRepository.save(newUser)
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOneByPersonalNumber(personalNumber: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({
      personalNumber: personalNumber
    })
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const personalNumber = User.GetNumberFromEmail(email);
    const user = await this.findOneByPersonalNumber(personalNumber)
    return user;
  }

  async update(dto: UpdateUserDto) {
    const user = await this.findOneByPersonalNumber(dto.personalNumber)
    if(user == null){
      throw new BadRequestException('Такой студент не заселяется')
    }
    user.gender ??= dto.gender
    user.fullname ??= dto.fullname
    user.citizenship ??= dto.citizenship
    user.faculty ??= dto.faculty
    user.phone ??= dto.phone
    user.dormitory = await this.dormRepository.findOneBy({
      name: dto.dormitory_name
    })
    return await this.userRepository.save(user)
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

  async getUserFromObject(item: any){
    const newUser = new User();
    newUser.fullname = item['ФИО']
    newUser.personalNumber = parseInt(item['Рег.номер'])
    if(Gender.female == item['Пол']){
      newUser.gender = item['Пол']
    }
    else if(Gender.male == item['Пол']){
      newUser.gender = item['Пол']
    }
    newUser.citizenship = item['Гражданство']
    newUser.faculty = item['Подразделение']
    newUser.phone = item['Телефон']
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
