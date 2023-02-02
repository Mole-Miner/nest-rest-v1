import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db/db.sqlite',
  entities: ['dist/**/entities/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: false,
  logging: true,
  subscribers: ['dist/**/subscribers/*.subscriber.js'],
};
export const dataSourceConfig = registerAs(
  'sqlite',
  (): DataSourceOptions => dataSourceOptions,
);

const dataSource: DataSource = new DataSource(dataSourceOptions);
export default dataSource;
