import { Test, TestingModule } from '@nestjs/testing';
import { Mappers } from './raza.mapper';

describe('Mappers', () => {
  let provider: Mappers;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mappers],
    }).compile();

    provider = module.get<Mappers>(Mappers);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
