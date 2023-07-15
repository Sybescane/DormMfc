import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNameInDormEnum1689427817239 implements MigrationInterface {
    name = 'ChangeNameInDormEnum1689427817239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dormitories" DROP CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05"`);
        await queryRunner.query(`ALTER TABLE "dormitories" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."dormitories_name_enum"`);
        await queryRunner.query(`ALTER TABLE "dormitories" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dormitories" ADD CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dormitories" DROP CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05"`);
        await queryRunner.query(`ALTER TABLE "dormitories" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."dormitories_name_enum" AS ENUM('М-1', 'М-2', 'М-3', 'М-4', 'Г-1', 'Г-2', 'ДСГ', 'ДК')`);
        await queryRunner.query(`ALTER TABLE "dormitories" ADD "name" "public"."dormitories_name_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dormitories" ADD CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05" UNIQUE ("name")`);
    }

}
