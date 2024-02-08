import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.DPOSTGRES_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  autoLoadEntities: true,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  synchronize: process.env.NODE_ENV === 'dev',
  logging: process.env.NODE_ENV === 'dev' ? 'all' : false,
};
