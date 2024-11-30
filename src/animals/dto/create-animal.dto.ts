import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsObject, IsArray, IsNumber, IsEnum } from 'class-validator';

export class CreateAnimalDto {

  @ApiProperty({
    description: 'Unique identifier for the animal added by farmer',
    example: 'ANML-12345'
  })
  @IsString()
  @IsNotEmpty()
  animalId: string;

  @ApiProperty({ description: 'User who added the animal', example: 'Ronnie Kakunguwo' })
  @IsString()
  @IsNotEmpty()
  addedBy: string;

  @ApiProperty({ description: 'Type of animal', example: 'Cow' })
  @IsString()
  @IsNotEmpty()
  animalType: string;

  @ApiProperty({
    description: "Health stautus of the animal",
    enum: ["Healthy", "Sick", "Under Treatment"],
    example: 'Healthy'
  })
  @IsString()
  @IsNotEmpty()
  healthStatus: string;

  @ApiProperty({ description: 'Additional attributes for the animal', example: { breed: 'HardMashona', age: 3 } })
  @IsObject()
  attr: any;

  // New fields
  @ApiProperty({ description: 'Name of the animal', example: 'Bessie' })
  @IsString()
  animalName: string;

  @ApiProperty({ description: 'Species or breed of the animal', example: 'Holstein' })
  @IsString()
  species: string;

  @ApiProperty({ description: 'Gender of the animal', enum: ["Male", "Female"], example: 'Female' })
  @IsString()
  @IsEnum(["Male", "Female"])
  gender: string;

  @ApiProperty({ description: 'Date of birth of the animal', example: '2020-05-20' })
  @IsString()
  @Type(() => Date)
  dateOfBirth: string;

  @ApiProperty({ description: 'Current age of the animal in years', example: 3 })
  @IsNumber()
  currentAge: number;

  @ApiProperty({ description: 'Unique ID (Microchip/Tag Number, QR Code, or Barcode)', example: 'MICRO-123456' })
  @IsString()
  uniqueId: string;

  @ApiProperty({ description: 'Color or markings of the animal', example: 'Black and White' })
  @IsString()
  color: string;

  @ApiProperty({ description: 'Photo URL of the animal', example: 'https://example.com/photo.jpg' })
  @IsString()
  photoUrl: string;

  @ApiProperty({ description: 'Purchase price of the animal in dollars', example: 1500.00 })
  @IsNumber()
  purchasePrice: number;

  @ApiProperty({ description: 'Current market value of the animal in dollars', example: 1800.00 })
  @IsNumber()
  currentMarketValue: number;

  @ApiProperty({ description: 'Insurance details if applicable', example: 'Farmers Insurance' })
  @IsString()
  insurance: string;

  @ApiProperty({
    description: 'List of known genetics (disease resistance, milk production, etc.)',
    example: [{ trait: 'Disease Resistance', value: 'High' }, { trait: 'Milk Production', value: 'Medium' }]
  })
  @IsArray()
  @IsObject({ each: true })
  genetics: { trait: string; value: string }[];
}