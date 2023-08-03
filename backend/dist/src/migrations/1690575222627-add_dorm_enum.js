"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDormEnum1690575222627 = void 0;
class AddDormEnum1690575222627 {
    constructor() {
        this.name = 'AddDormEnum1690575222627';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "dormitories" DROP CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05"`);
        await queryRunner.query(`ALTER TABLE "dormitories" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."dormitory_enum" AS ENUM('М-1', 'М-2', 'М-3', 'М-4', 'Г-1', 'Г-2', 'ДСГ', 'ДК')`);
        await queryRunner.query(`ALTER TABLE "dormitories" ADD "name" "public"."dormitory_enum"`);
        await queryRunner.query(`ALTER TABLE "dormitories" ADD CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05" UNIQUE ("name")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "dormitories" DROP CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05"`);
        await queryRunner.query(`ALTER TABLE "dormitories" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."dormitory_enum"`);
        await queryRunner.query(`ALTER TABLE "dormitories" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dormitories" ADD CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05" UNIQUE ("name")`);
    }
}
exports.AddDormEnum1690575222627 = AddDormEnum1690575222627;
//# sourceMappingURL=1690575222627-add_dorm_enum.js.map