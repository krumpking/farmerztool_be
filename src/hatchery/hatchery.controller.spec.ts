import { Test, TestingModule } from '@nestjs/testing';
import { HatcheryController } from './hatchery.controller';
import { HatcheryService } from './hatchery.service';

describe('HatcheryController', () => {
  let controller: HatcheryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HatcheryController],
      providers: [HatcheryService],
    }).compile();

    controller = module.get<HatcheryController>(HatcheryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
