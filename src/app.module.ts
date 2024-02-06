import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LuchadoresModule } from './luchadores/luchadores.module';

@Module({
  imports: [LuchadoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
