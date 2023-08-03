"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddConfirmCodeInUser1689601958878 = void 0;
class AddConfirmCodeInUser1689601958878 {
    constructor() {
        this.name = 'AddConfirmCodeInUser1689601958878';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "code_confirm" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "code_confirm"`);
    }
}
exports.AddConfirmCodeInUser1689601958878 = AddConfirmCodeInUser1689601958878;
//# sourceMappingURL=1689601958878-add_confirmCode_in_user.js.map