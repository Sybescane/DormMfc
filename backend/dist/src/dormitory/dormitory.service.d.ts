import { Repository } from "typeorm";
import { Dormitory } from "./entity/dormitory.entity";
import { CreateDormDto } from "./dto/create-dorm.dto";
import { DormitoryEnum } from "./entity/dormitory.enum";
export declare class DormitoryService {
    private readonly dormRepository;
    constructor(dormRepository: Repository<Dormitory>);
    createDorm(dto: CreateDormDto): Promise<Dormitory>;
    findOneByName(name: DormitoryEnum): Promise<Dormitory>;
}
