import { Test, TestingModule } from '@nestjs/testing';
import { HatcheryService } from './hatchery.service';

describe('HatcheryService', () => {
  let service: HatcheryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HatcheryService],
    }).compile();

    service = module.get<HatcheryService>(HatcheryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
