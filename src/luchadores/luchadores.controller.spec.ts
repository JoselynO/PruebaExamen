import { Test, TestingModule } from '@nestjs/testing';
import { LuchadoresController } from './luchadores.controller';
import { LuchadoresService } from './luchadores.service';

describe('LuchadoresController', () => {
  let controller: LuchadoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LuchadoresController],
      providers: [LuchadoresService],
    }).compile();

    controller = module.get<LuchadoresController>(LuchadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
