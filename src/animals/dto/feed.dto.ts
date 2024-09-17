import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedDto {

  @ApiProperty({
    description: 'The ID of the user who added the feed',
    example: 'user-123',
  })
  @IsString()
  @IsNotEmpty()
  addedBy: string;

  @ApiProperty({
    description: 'The ID of the animal associated with the feed',
    example: 'animal-123',
  })
  @IsString()
  @IsNotEmpty()
  animalId: string;

  @ApiProperty({
    description: 'A brief description of the feed',
    example: 'High-quality dog food',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The type of feed (e.g. dry, wet, etc.)',
    example: 'dry',
  })
  @IsString()
  @IsNotEmpty()
  feedType: string;

  @ApiProperty({
    description: 'The source of the feed (e.g. manufacturer, supplier, etc.)',
    example: 'Purina',
  })
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({
    description: 'The nutritional value of the feed',
    example: '30% protein, 20% fat',
  })
  @IsString()
  @IsNotEmpty()
  nutritionalValue: string;

  @ApiProperty({
    description: 'An array of barcodes associated with the feed',
    example: ['1234567890', '9876543210'],
  })
  @IsArray()
  barcode: string[];
}