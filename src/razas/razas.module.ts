import { Module } from '@nestjs/common';
import { RazasService } from './razas.service';
import { RazasController } from './razas.controller';
import { Raza } from './entities/raza.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RazaMappers } from './mappers/raza.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Raza])],
  controllers: [RazasController],
  providers: [RazasService, RazaMappers],
  exports: [],
})
export class RazasModule {}
