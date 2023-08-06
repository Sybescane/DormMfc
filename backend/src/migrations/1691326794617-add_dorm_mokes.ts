import { MigrationInterface, QueryRunner } from "typeorm"

export class AddDormMokes1691326794617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO public.dormitories
            (dormitory_id, address, description, name)
            VALUES 
            (1, 'ул. Профсоюзная д.83к1', 'В это общежитие есть то и то', 'М-1'),
            (2, 'ул. Профсоюзная д.83к2', 'В это общежитие есть то и то', 'М-2'),
            (3, 'ул. Профсоюзная д.83к3', 'В это общежитие есть то и то','М-3'),
            (4, 'ул. Академика Волгина, д. 4', 'В этом общежитие есть то и то','М-4'),
            (5, 'пр. 60-летия Октября д. 15', 'В это общежитие есть то и то', 'Г-1'),
            (6, 'пр. 60-летия Октября д. 11', 'В это общежитие есть то и то', 'Г-2'),
            (7, '2-ой Донской проезд д.9 стр.3', 'В этом общежитие есть то и то', 'ДК'),
            (8, 'ул. Студенческая д. 33, корпуса 5,6', 'В это общежитие есть то и то', 'ДСГ');
        `);
      }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM public.dormitories WHERE dormitory_id IN (1, 2, 3, 4, 5, 6, 7, 8);
        `)
    }

}
