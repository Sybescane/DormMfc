"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUniqueNameDorm1689420028498 = void 0;
class AddUniqueNameDorm1689420028498 {
    constructor() {
        this.name = 'AddUniqueNameDorm1689420028498';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "dormitories" ADD CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05" UNIQUE ("name")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "dormitories" DROP CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05"`);
    }
}
exports.AddUniqueNameDorm1689420028498 = AddUniqueNameDorm1689420028498;
//# sourceMappingURL=1689420028498-Add_unique_name_Dorm.js.map