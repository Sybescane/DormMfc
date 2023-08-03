"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRecordInUsers1690033188626 = void 0;
class AddRecordInUsers1690033188626 {
    constructor() {
        this.name = 'AddRecordInUsers1690033188626';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_518459f32fd38406d8294501cc4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dormitoryDormitoryId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "record_datetime" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dormitory_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a11511579691610799cbd6f4410" FOREIGN KEY ("dormitory_id") REFERENCES "dormitories"("dormitory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a11511579691610799cbd6f4410"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dormitory_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "record_datetime"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dormitoryDormitoryId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_518459f32fd38406d8294501cc4" FOREIGN KEY ("dormitoryDormitoryId") REFERENCES "dormitories"("dormitory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.AddRecordInUsers1690033188626 = AddRecordInUsers1690033188626;
//# sourceMappingURL=1690033188626-add_record_in_users.js.map