import { DataSource } from 'typeorm';

const ormConfig: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'GoodZone',
  username: 'postgres',
  password: '201281Mama',
  entities: ['dist/src/**/**/*.entity.js'],
  logging: true,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*{.js,.ts}'],
});
export default ormConfig;