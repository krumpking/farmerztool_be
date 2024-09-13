import { PartialType } from '@nestjs/swagger';
import { CreateHatcheryDto } from './create-hatchery.dto';


export class UpdateHatcheryDto extends PartialType(CreateHatcheryDto) {}
