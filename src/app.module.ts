import { Module } from '@nestjs/common';
import { RazasModule } from './razas/razas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LuchadoresModule } from './luchadores/luchadores.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [],
  imports: [
    LuchadoresModule,
    RazasModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
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
    }),
  ],
})
export class AppModule {}
