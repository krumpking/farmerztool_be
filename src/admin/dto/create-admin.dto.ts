import { IsString, IsNumber, IsArray, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmDto {

  @ApiProperty({
    description: 'Farm name',
    example: 'Green Valley Farm',
  })
  @IsString()
  farmName: string;

  @ApiProperty({
    description: 'Farmer name',
    example: 'John Doe',
  })
  @IsString()
  farmerName: string;

  @ApiProperty({
    description: 'Farmer age',
    example: 35,
  })
  @IsNumber()
  farmerAge: number;

  @ApiProperty({
    description: 'Farmer phone number',
    example: '+1 123 456 7890',
  })
  @IsString()
  farmerPhoneNumber: string;

  @ApiProperty({
    description: 'Location city',
    example: 'New York',
  })
  @IsString()
  locationCity: string;

  @ApiProperty({
    description: 'Location state/province',
    example: 'New York State',
  })
  @IsString()
  locationStateProvince: string;

  @ApiProperty({
    description: 'Location country',
    example: 'USA',
  })
  @IsString()
  locationCountry: string;

  @ApiProperty({
    description: 'Number of employees',
    example: 10,
  })
  @IsNumber()
  numberOfEmployees: number;

  @ApiProperty({
    description: 'Upload logo (file URL)',
    example: 'https://example.com/logo.png',
  })
  @IsString()
  uploadLogo: string;

  @ApiProperty({
    description: 'Area size (e.g. 100 acres)',
    example: '100 acres',
  })
  @IsString()
  areaSize: string;

  @ApiProperty({
    description: "Area unit",
    example: "100"
  })
  @IsString()
  areaUnit: string

  @ApiProperty({
    description: 'List of animals (e.g. cows, pigs, chickens)',
    example: ['cows', 'pigs', 'chickens'],
  })
  @IsArray()
  animals: string[];

  @ApiProperty({
    description: 'List of crops (e.g. corn, wheat, soybeans)',
    example: ['corn', 'wheat', 'soybeans'],
  })
  @IsArray()
  crops: string[];

  @ApiProperty({
    description: 'Date established (YYYY-MM-DD)',
    example: '2020-01-01',
  })
  @IsDateString()
  dateEstablished: Date;
}