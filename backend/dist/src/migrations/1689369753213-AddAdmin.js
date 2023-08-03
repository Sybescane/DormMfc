"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAdmin1689369753213 = void 0;
class AddAdmin1689369753213 {
    constructor() {
        this.name = 'AddAdmin1689369753213';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."admins_admin_type_enum" AS ENUM('Главный админ', 'Комендант', 'Студсовет')`);
        await queryRunner.query(`CREATE TYPE "public"."admins_dormitory_enum" AS ENUM('М-1', 'М-2', 'М-3', 'М-4', 'Г-1', 'Г-2', 'ДСГ', 'ALL')`);
        await queryRunner.query(`CREATE TABLE "admins" ("admin_id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "fullname" character varying NOT NULL, "admin_type" "public"."admins_admin_type_enum" NOT NULL, "dormitory" "public"."admins_dormitory_enum" NOT NULL, CONSTRAINT "UQ_3d704d9a959cb04ba6f7e942ddb" UNIQUE ("login"), CONSTRAINT "PK_88070d08be64522fc84fdefef85" PRIMARY KEY ("admin_id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "admins"`);
        await queryRunner.query(`DROP TYPE "public"."admins_dormitory_enum"`);
        await queryRunner.query(`DROP TYPE "public"."admins_admin_type_enum"`);
    }
}
exports.AddAdmin1689369753213 = AddAdmin1689369753213;
//# sourceMappingURL=1689369753213-AddAdmin.js.map