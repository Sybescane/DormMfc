import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddUniqueNameDorm1689420028498 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
