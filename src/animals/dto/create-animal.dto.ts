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
  @ApiProperty({ description: 'Admin ID', example: '507f1f77bcf86cd799439011' })
  @IsString()
  adminId: string;

  @ApiProperty({ description: 'Number of animals', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  numberOfAnimals: number;

  @ApiProperty({ description: 'Animal ID', example: 'ANML-12345' })
  @IsString()
  @IsNotEmpty()
  animalId: string;

  @ApiProperty({ description: 'Added by user/employee ID' })
  addedBy: string;

  @ApiProperty({
    description: 'Type of user who added',
    enum: ['Users', 'Employees'],
  })
  addedByType: string;

  @ApiProperty({ description: 'Type of animal', example: 'Cow' })
  @IsString()
  @IsNotEmpty()
  animalType: string;

  @ApiProperty({ description: 'Additional attributes' })
  // @IsObject()
  attr: Record<string, any>;

  @ApiProperty({
    description: 'Health status',
    enum: ['Healthy', 'Sick', 'Under Treatment'],
  })
  @IsEnum(['Healthy', 'Sick', 'Under Treatment'])
  healthStatus: string;

  @ApiProperty({ description: 'Species', example: 'Holstein' })
  @IsString()
  @IsNotEmpty()
  species: string;

  @ApiProperty({ description: 'Gender', enum: ['Male', 'Female'] })
  @IsEnum(['Male', 'Female'])
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ description: 'Date of birth' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({ description: 'Fertility status' })
  @IsString()
  fertilityStatus: string;

  @ApiProperty({ description: 'Breeding status' })
  @IsString()
  breedingStatus: string;

  @ApiProperty({ description: 'Breeding cycle' })
  @IsString()
  breedingCycle: string;

  @ApiProperty({ description: 'Previous mating date' })
  @IsDate()
  @Type(() => Date)
  previousMatingDate: Date;

  @ApiProperty({ description: 'Color' })
  @IsString()
  color: string;

  @ApiProperty({ description: 'Photo URL' })
  @IsString()
  photoUrl: string;

  @ApiProperty({ description: 'Purchase price' })
  @IsString()
  purchasePrice: string;

  @ApiProperty({ description: 'Current weight' })
  @IsString()
  currentWeight: string;

  @ApiProperty({ description: 'Genetics' })
  @IsArray()
  genetics: string[];

  @ApiProperty({ description: 'Assigned location' })
  @IsString()
  assignLocation: string;

  @ApiProperty({ description: 'Ownership tags' })
  @IsArray()
  ownershipTags: string[];

  @ApiProperty({ description: 'Date of acquisition' })
  @IsDate()
  @Type(() => Date)
  dateOfAcquisition: Date;

  @ApiProperty({ description: 'Asset tags' })
  @IsArray()
  assignAssetTags: string[];

  @ApiProperty({ description: 'Source' })
  @IsArray()
  source: string[];

  @ApiProperty({ description: 'Purpose' })
  @IsString()
  purpose: string;

  @ApiProperty({ description: 'Date of birth range' })
  @IsArray()
  dobRange: string[];

  @ApiProperty({ description: 'Gender counts' })
  @IsArray()
  genderCounts: number[];
}
