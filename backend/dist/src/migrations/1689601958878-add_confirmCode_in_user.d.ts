import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddConfirmCodeInUser1689601958878 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
