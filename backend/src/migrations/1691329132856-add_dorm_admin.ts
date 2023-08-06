import { hash } from "argon2";
import { MigrationInterface, QueryRunner } from "typeorm"

export class AddDormAdmin1691329132856 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const passwordAlex = await hash('07092003')
        const passwordArtem = await hash('12052004')
        const passwordIgor = await hash('29072002')
        await queryRunner.query(`
        INSERT INTO public.admins(
            login, password, fullname, admin_type, is_show, "position", "dormitoryDormitoryId")
            VALUES 
                ('PopovAA', '${passwordAlex}', 'Попов Александр Андреевич', 'Главный админ', false, 'Разработчик', 6),
                ('ZebelyanAV', '${passwordArtem}', 'Зебелян Артём Валерьевич', 'Главный админ', false, 'Разработчик', 3),
                ('SokolovIA', '${passwordIgor}', 'Соколов Игорь Андреевич', 'Главный админ', false, 'Разработчик', 3);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM public.admins
            WHERE login = 'PopovAA' or login = 'ZebelyanAV' or login = 'SokolovIA';
        `)
    }

}
