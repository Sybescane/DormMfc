import { MigrationInterface, QueryRunner } from "typeorm";
export declare class ChangeNameInDormEnum1689427817239 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
