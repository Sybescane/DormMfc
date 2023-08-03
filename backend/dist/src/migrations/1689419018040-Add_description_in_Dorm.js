"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDescriptionInDorm1689419018040 = void 0;
class AddDescriptionInDorm1689419018040 {
    constructor() {
        this.name = 'AddDescriptionInDorm1689419018040';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "dormitories" ADD "description" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "dormitories" DROP COLUMN "description"`);
    }
}
exports.AddDescriptionInDorm1689419018040 = AddDescriptionInDorm1689419018040;
//# sourceMappingURL=1689419018040-Add_description_in_Dorm.js.map