import { Test, TestingModule } from '@nestjs/testing';
import { LuchadoresService } from './luchadores.service';

describe('LuchadoresService', () => {
  let service: LuchadoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LuchadoresService],
    }).compile();

    service = module.get<LuchadoresService>(LuchadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
