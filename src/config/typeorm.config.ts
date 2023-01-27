import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db/db',
  entities: ['dist/**/entities/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: false,
  logging: true,
};
export const typeormConfig = registerAs(
  'typeorm',
  (): DataSourceOptions => dataSourceOptions,
);

const dataSource: DataSource = new DataSource(dataSourceOptions);
export default dataSource;
