"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDKInDormEnum1689418217499 = void 0;
class AddDKInDormEnum1689418217499 {
    constructor() {
        this.name = 'AddDKInDormEnum1689418217499';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "public"."dormitories_name_enum" RENAME TO "dormitories_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."dormitories_name_enum" AS ENUM('М-1', 'М-2', 'М-3', 'М-4', 'Г-1', 'Г-2', 'ДСГ', 'ДК')`);
        await queryRunner.query(`ALTER TABLE "dormitories" ALTER COLUMN "name" TYPE "public"."dormitories_name_enum" USING "name"::"text"::"public"."dormitories_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."dormitories_name_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."dormitories_name_enum_old" AS ENUM('М-1', 'М-2', 'М-3', 'М-4', 'Г-1', 'Г-2', 'ДСГ')`);
        await queryRunner.query(`ALTER TABLE "dormitories" ALTER COLUMN "name" TYPE "public"."dormitories_name_enum_old" USING "name"::"text"::"public"."dormitories_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."dormitories_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."dormitories_name_enum_old" RENAME TO "dormitories_name_enum"`);
    }
}
exports.AddDKInDormEnum1689418217499 = AddDKInDormEnum1689418217499;
//# sourceMappingURL=1689418217499-Add_DK_in_dormEnum.js.map