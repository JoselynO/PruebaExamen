import { Module } from '@nestjs/common';
import { LuchadoresService } from './luchadores.service';
import { LuchadoresController } from './luchadores.controller';

@Module({
  controllers: [LuchadoresController],
  providers: [LuchadoresService],
})
export class LuchadoresModule {}
