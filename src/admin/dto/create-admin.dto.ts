import { IsString, IsNumber,  IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmDto {

  @ApiProperty({
    description: 'Farm name',
    example: 'Green Valley Farm',
    required: true
  })
  @IsString()
  farmName: string;

  @ApiProperty({
    description: 'Farmer name',
    example: 'Ronnie Kakunguwo',
    required: true
  })
  @IsString()
  farmerName: string;

  @ApiProperty({
    description: 'Farmer age',
    example: 35,
    required: false
  })
  @IsNumber()
  @IsOptional()
  farmerAge: number;

  @ApiProperty({
    description: 'Farmer phone number',
    example: '+1 123 456 7890',
    required: false
  })
  @IsString()
  farmerPhoneNumber: string;

  @ApiProperty({
    description: 'Location city',
    example: 'New York',
    required: true
  })
  @IsString()
  locationCity: string;

  @ApiProperty({
    description: 'Location state/province',
    example: 'New York State',
    required: true
  })
  @IsString()
  locationStateProvince: string;

  @ApiProperty({
    description: 'Location country',
    example: 'USA',
    required: true
  })
  @IsString()
  locationCountry: string;

  @ApiProperty({
    description: 'Number of employees',
    example: 10,
    required: true
  })
  @IsNumber()
  numberOfEmployees: number;

  @ApiProperty({
    description: 'Upload logo (file URL)',
    example: 'https://example.com/logo.png',
    required: false
  })
  @IsString()
  uploadLogo: string;

  @ApiProperty({
    description: 'Area size (e.g. 100 acres)',
    example: '100 acres',
    required: true
  })
  @IsString()
  areaSize: string;

  @ApiProperty({
    description: "Area unit",
    example: "100",
    required: true
  })
  @IsString()
  areaUnit: string

}