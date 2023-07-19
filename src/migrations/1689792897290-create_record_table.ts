import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecordTable1689792897290 implements MigrationInterface {
    name = 'CreateRecordTable1689792897290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "records" ("record_id" SERIAL NOT NULL, "datetime" TIMESTAMP NOT NULL, "userUserId" integer, "dormitoryDormitoryId" integer, CONSTRAINT "REL_5a48bc3c57e445739e4a44dba5" UNIQUE ("userUserId"), CONSTRAINT "PK_6a9b1be47e6af9167a2ec10cd4d" PRIMARY KEY ("record_id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "recordRecordId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_2dcca9cde3eec1c7af49cb16555" UNIQUE ("recordRecordId")`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_5a48bc3c57e445739e4a44dba5a" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_bdf59eaf4955003d9dbaf3370b2" FOREIGN KEY ("dormitoryDormitoryId") REFERENCES "dormitories"("dormitory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_2dcca9cde3eec1c7af49cb16555" FOREIGN KEY ("recordRecordId") REFERENCES "records"("record_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_2dcca9cde3eec1c7af49cb16555"`);
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_bdf59eaf4955003d9dbaf3370b2"`);
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_5a48bc3c57e445739e4a44dba5a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_2dcca9cde3eec1c7af49cb16555"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "recordRecordId"`);
        await queryRunner.query(`DROP TABLE "records"`);
    }

}
