import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsArray,
  IsNumber,
  IsEnum,
  IsDate,
} from 'class-validator';

export class CreateAnimalDto {
  @ApiProperty({
    description: 'Number of animals represented by this record',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  numberOfAnimals: number;

  @ApiProperty({
    description: 'Unique identifier for the animal added by farmer',
    example: 'ANML-12345',
  })
  @IsString()
  @IsNotEmpty()
  animalId: string;

  @ApiProperty({ description: 'Type of animal', example: 'Cow' })
  @IsString()
  @IsNotEmpty()
  animalType: string;

  @ApiProperty({
    description: 'Health stautus of the animal',
    enum: ['Healthy', 'Sick', 'Under Treatment'],
    example: 'Healthy',
  })
  @IsString()
  @IsEnum(['Healthy', 'Sick', 'Under Treatment'])
  healthStatus: string;

  @ApiProperty({
    description: 'Additional attributes for the animal',
    example: { breed: 'HardMashona', age: 3 },
  })
  @IsObject()
  attr: any;

  // New fields
  // @ApiProperty({ description: 'Name of the animal', example: 'Bessie' })
  // @IsString()
  // animalName: string;

  @ApiProperty({
    description: 'Species or breed of the animal',
    example: 'Holstein',
  })
  @IsString()
  @IsNotEmpty()
  species: string;

  @ApiProperty({
    description: 'Gender of the animal',
    enum: ['Male', 'Female'],
    example: 'Female',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['Male', 'Female'])
  gender: string;

  @ApiProperty({
    description: 'Date of birth of the animal',
    example: '2020-05-20',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Color or markings of the animal',
    example: 'Black and White',
  })
  @IsString()
  color: string;

  @ApiProperty({
    description: 'Photo URL of the animal',
    example: 'https://example.com/photo.jpg',
  })
  @IsString()
  photoUrl: string;

  @ApiProperty({
    description: 'Purchase price of the animal',
    example: '15USD',
  })
  @IsString()
  purchasePrice: string;

  @ApiProperty({
    description: 'Current weight of the animal',
    example: '100kgs',
  })
  @IsString()
  currentWeight: string;

  @ApiProperty({
    description:
      'List of known genetics (disease resistance, milk production, etc.)',
    example: ['Disease Resistance', 'Milk Production', ,],
  })
  @IsArray()
  genetics: [];

  @ApiProperty({
    description: 'Current location of the animal',
    example: 'Barn 1',
  })
  @IsString()
  assignLocation: string;

  @ApiProperty({
    description: 'List of known owners',
    example: ['John ', 'Peter'],
  })
  @IsArray()
  ownershipTags: [];

  @ApiProperty({
    description: 'Date of purchase of the animal',
    example: '2023-05-20',
  })
  @IsDate()
  @Type(() => Date)
  dateOfAcquisition: Date;

  @ApiProperty({
    description: 'List of known assets',
    example: ['Chain ', 'RFID'],
  })
  @IsArray()
  assignAssetTags: [];

  @ApiProperty({
    description: 'Source of the animal',
    example: ['Auction'],
  })
  @IsArray()
  source: [];

  @ApiProperty({
    description: 'Purpose of the animal',
    example: 'Slaughter',
  })
  @IsString()
  purpose: string;

  @ApiProperty({
    description: 'Date of birth range [0] initial date [1] final date',
    example: '2020-01-01 to 2020-12-31',
  })
  @IsArray()
  dobRange: [];

  @ApiProperty({
    description: 'Gender counts [0] male [1] female',
    example: '[5,7] meaning 5 male and 7 female',
  })
  @IsArray()
  genderCounts: [];
}
