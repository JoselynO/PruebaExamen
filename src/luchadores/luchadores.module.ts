import { Module } from '@nestjs/common';
import { LuchadoresService } from './luchadores.service';
import { LuchadoresController } from './luchadores.controller';
import { LuchadoresMapper } from './mappers/luchadores.mappers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Luchadore } from './entities/luchadore.entity';
import { Raza } from '../razas/entities/raza.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Luchadore]),
    TypeOrmModule.forFeature([Raza]),
  ],
  controllers: [LuchadoresController],
  providers: [LuchadoresService, LuchadoresMapper],
})
export class LuchadoresModule {}
