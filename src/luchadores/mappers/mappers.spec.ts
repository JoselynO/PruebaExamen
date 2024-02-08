import { Test, TestingModule } from '@nestjs/testing';
import { LuchadoresMapper } from './luchadores.mappers';

describe('Mappers', () => {
  let provider: LuchadoresMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LuchadoresMapper],
    }).compile();

    provider = module.get<LuchadoresMapper>(LuchadoresMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
