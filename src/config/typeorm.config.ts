import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const TypeormConfig = registerAs(
  'typeorm',
  (): DataSourceOptions => ({
    type: 'sqlite',
    database: 'db',
    entities: ['dist/src/**/entities/*.entity.js'],
    synchronize: false,
    migrations: ['dist/src/db/migrations/*.js'],
    migrationsRun: false,
    migrationsTableName: 'history',
    logging: true,
  }),
);
