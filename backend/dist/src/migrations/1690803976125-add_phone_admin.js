"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPhoneAdmin1690803976125 = void 0;
class AddPhoneAdmin1690803976125 {
    constructor() {
        this.name = 'AddPhoneAdmin1690803976125';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admins" ADD "phone" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "phone"`);
    }
}
exports.AddPhoneAdmin1690803976125 = AddPhoneAdmin1690803976125;
//# sourceMappingURL=1690803976125-add_phone_admin.js.map