import { Dormitory } from "src/dormitory/entity/dormitory.entity";
declare const CreateDormDto_base: import("@nestjs/common").Type<Pick<Dormitory, "name" | "description" | "address">>;
export declare class CreateDormDto extends CreateDormDto_base {
}
export {};
