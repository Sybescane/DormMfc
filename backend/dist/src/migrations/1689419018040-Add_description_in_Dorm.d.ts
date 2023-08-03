import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddDescriptionInDorm1689419018040 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
