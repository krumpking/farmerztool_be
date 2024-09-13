import { Controller } from '@nestjs/common';
import { HatcheryService } from './hatchery.service';


@Controller('hatchery')
export class HatcheryController {
  constructor(private readonly hatcheryService: HatcheryService) {}

 
}
