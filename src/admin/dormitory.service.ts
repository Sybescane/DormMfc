import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Dormitory } from "./entities/dormitory.entity";
import { Repository } from "typeorm";
import { CreateDormDto } from "./dto/dorm-dto/create-dorm.dto";

@Injectable()
export class DormitoryService{
    constructor(@InjectRepository(Dormitory) private readonly dormRepository: Repository<Dormitory>){}

    async createDorm(dto: CreateDormDto) {
        const dorm = this.dormRepository.create();
        dorm.address = dto.address;
        dorm.description = dto.description;
        dorm.name = dto.name;
        return await this.dormRepository.save(dorm);
      }


}