import { IsString, IsNumber, IsDate, IsBoolean, IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHatcheryDto {
  @ApiProperty({
    description: 'The type of animal that produced the eggs',
    example: 'Chicken',
  })
  @IsString()
  animalType: string;

  @ApiProperty({
    description: 'The breed of the male animal',
    example: 'Rhode Island Red',
  })
  @IsString()
  maleBreed: string;

  @ApiProperty({
    description: 'The breed of the female animal',
    example: 'Leghorn',
  })
  @IsString()
  femaleBreed: string;

  @ApiProperty({
    description: 'The date the eggs were collected',
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsDate()
  eggCollectionDate: Date;

  @ApiProperty({
    description: 'The number of eggs collected',
    example: 12,
  })
  @IsNumber()
  eggQuantity: number;

  @ApiProperty({
    description: 'The color of the eggs',
    example: 'Brown',
  })
  @IsString()
  eggColor: string;

  @ApiProperty({
    description: 'The average weight of each egg',
    example: 50,
  })
  @IsNumber()
  avgWeightPerEgg: number;

  @ApiProperty({
    description: 'The total weight of all eggs',
    example: 600,
  })
  @IsNumber()
  totalWeight: number;

  @ApiProperty({
    description: 'The size of the eggs',
    example: 'Large',
  })
  @IsString()
  eggSize: string;

  @ApiProperty({
    description: 'The method used to store the eggs',
    example: 'Refrigerated',
  })
  @IsString()
  storageMethod: string;

  @ApiProperty({
    description: 'The location where the eggs are stored',
    example: 'Farm',
  })
  @IsString()
  storageLocation: string;

  @ApiProperty({
    description: 'The quality of the eggs',
    example: 'A',
  })
  @IsEnum(['A', 'B', 'C', 'D'])
  eggQuality: 'A' | 'B' | 'C' | 'D';

  @ApiProperty({
    description: 'Whether the eggs are fertile',
    example: true,
  })
  @IsBoolean()
  fertilityStatus: boolean;

  @ApiProperty({
    description: 'The purpose of the eggs',
    example: 'Hatching',
  })
  @IsString()
  purpose: string;

  @ApiProperty({
    description: 'The price per egg',
    example: 0.50,
  })
  @IsNumber()
  pricePerEgg: number;

  @ApiProperty({
    description: 'The shelf life expiration date of the eggs',
    example: '2022-01-15T00:00:00.000Z',
  })
  @IsDate()
  shelfLifeExpirationDate: Date;

  @ApiProperty({
    description: 'The batch number of the eggs',
    example: '12345',
  })
  @IsString()
  batchNumber: string;

  @ApiProperty({
    description: 'The source of the eggs',
    example: 'Livestock',
  })
  @IsEnum(['Livestock', 'Customer'])
  source: 'Livestock' | 'Customer';

  @ApiProperty({
    description: 'The use of the eggs',
    example: 'Internal Incubation',
  })
  @IsEnum(['Internal Incubation', 'Customer Incubation'])
  eggsUse: 'Internal Incubation' | 'Customer Incubation';

  @ApiProperty({
    description: 'Additional attributes of the eggs',
    example: {
      incubationTemperature: 37.5,
      incubationHumidity: 50,
    },
  })
  @IsObject()
  attr: {
    [key: string]: any;
  };
}