import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  async create(dto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create()
    newUser.personalNumber = dto.personalNumber
    newUser.fullname = dto.fullname
    newUser.gender = dto.gender
    newUser.citizenship = dto.citizenship
    newUser.faculty = dto.faculty
    newUser.phone = dto.phone
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async save(user:User){
    await this.userRepository.save(user)
  }
}
