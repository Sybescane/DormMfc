import { ApiProperty, PickType } from "@nestjs/swagger";
import { Dormitory } from "src/admin/entities/dormitory.entity";

export class CreateDormDto extends PickType(Dormitory, ['address', 'description', 'name'] as const){
    
}