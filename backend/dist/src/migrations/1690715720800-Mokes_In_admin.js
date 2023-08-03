"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MokesInAdmin1690715720800 = void 0;
const argon2_1 = require("argon2");
class MokesInAdmin1690715720800 {
    async up(queryRunner) {
        const passwordAlex = await (0, argon2_1.hash)('07092003');
        const passwordArtem = await (0, argon2_1.hash)('12052004');
        const passwordIgor = await (0, argon2_1.hash)('29072002');
        await queryRunner.query(`
        INSERT INTO public.admins(
            login, password, fullname, admin_type, is_show, "position", "dormitoryDormitoryId")
            VALUES 
                ('PopovAA', '${passwordAlex}', 'Попов Александр Андреевич', 'Главный админ', false, 'Разработчик', 6),
                ('ZebelyanAV', '${passwordArtem}', 'Зебелян Артём Валерьевич', 'Главный админ', false, 'Разработчик', 3),
                ('SokolovIA', '${passwordIgor}', 'Соколов Игорь Андреевич', 'Главный админ', false, 'Разработчик', 3);
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
        DELETE FROM public.admins
            WHERE login = 'PopovAA' or login = 'ZebelyanAV' or login = 'SokolovIA';
        `);
    }
}
exports.MokesInAdmin1690715720800 = MokesInAdmin1690715720800;
//# sourceMappingURL=1690715720800-Mokes_In_admin.js.map