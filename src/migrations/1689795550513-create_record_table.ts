import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecordTable1689795550513 implements MigrationInterface {
    name = 'CreateRecordTable1689795550513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_518459f32fd38406d8294501cc4"`);
        await queryRunner.query(`CREATE TABLE "records" ("record_id" SERIAL NOT NULL, "datetime" TIMESTAMP NOT NULL, "user_id" integer, "dormitory_id" integer, CONSTRAINT "REL_27b2efc240866f140b8eb6ac55" UNIQUE ("user_id"), CONSTRAINT "PK_6a9b1be47e6af9167a2ec10cd4d" PRIMARY KEY ("record_id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dormitoryDormitoryId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dormitory_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "record_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_5a435479ceba93196d776dc6fe0" UNIQUE ("record_id")`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_27b2efc240866f140b8eb6ac554" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_7ede7daf595264c93ecc05f2eb8" FOREIGN KEY ("dormitory_id") REFERENCES "dormitories"("dormitory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a11511579691610799cbd6f4410" FOREIGN KEY ("dormitory_id") REFERENCES "dormitories"("dormitory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_5a435479ceba93196d776dc6fe0" FOREIGN KEY ("record_id") REFERENCES "records"("record_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_5a435479ceba93196d776dc6fe0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a11511579691610799cbd6f4410"`);
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_7ede7daf595264c93ecc05f2eb8"`);
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_27b2efc240866f140b8eb6ac554"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_5a435479ceba93196d776dc6fe0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "record_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dormitory_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dormitoryDormitoryId" integer`);
        await queryRunner.query(`DROP TABLE "records"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_518459f32fd38406d8294501cc4" FOREIGN KEY ("dormitoryDormitoryId") REFERENCES "dormitories"("dormitory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
