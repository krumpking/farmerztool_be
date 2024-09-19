import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIrrigationDto {
  @ApiProperty({
    type: 'string',
    description: 'The type of irrigation (e.g. drip, sprinkler, etc.)',
    example: 'Drip Irrigation'
  })
  @IsString()
  @IsNotEmpty()
  irrigationType: string;

  @ApiProperty({
    type: 'string',
    description: 'The area covered by this irrigation (e.g. acres, hectares, etc.)',
    example: '10 acres'
  })
  @IsString()
  @IsNotEmpty()
  areaCovered: string;

  @ApiProperty({
    type: 'number',
    description: 'The estimated water usage for this irrigation (e.g. gallons, liters, etc.)',
    example: 1000
  })
  @IsNumber()
  @IsNotEmpty()
  estimatedWaterUsage: number;

  @ApiProperty({
    type: 'string',
    description: 'The user who added this irrigation',
    example: 'John Doe'
  })
  @IsString()
  @IsNotEmpty()
  addedBy: string;

  @ApiProperty({
    type: 'string',
    description: 'Optional notes about this irrigation',
    example: 'This is a test irrigation',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;
}