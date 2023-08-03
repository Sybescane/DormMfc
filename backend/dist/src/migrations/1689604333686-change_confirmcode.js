"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeConfirmcode1689604333686 = void 0;
class ChangeConfirmcode1689604333686 {
    constructor() {
        this.name = 'ChangeConfirmcode1689604333686';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "code_confirm"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "code_confirm" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "code_confirm"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "code_confirm" integer`);
    }
}
exports.ChangeConfirmcode1689604333686 = ChangeConfirmcode1689604333686;
//# sourceMappingURL=1689604333686-change_confirmcode.js.map