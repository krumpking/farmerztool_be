import {
  IsString,
  IsDateString,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsDefined
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBreedingDto {


  @ApiProperty({
    description: 'Added by',
    example: 'Ronnie Kakunguwo',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  addedBy: string;

  @ApiProperty({
    description: 'Courtship. NB: Can be either Successful or Unsuccessful',
    example: 'Successful',
    required: true
  })
  @IsString()
  @IsIn(['Successful', 'Unsuccessful'])
  courtship: string;

  @ApiProperty({
    description: 'Mating. NB: Can be either Natural or Artificial',
    example: 'Natural',
    required: true
  })
  @IsString()
  @IsIn(['Natural', 'Artificial'])
  mating: string;

  @ApiProperty({
    description: 'Lineage Mother',
    example: 'Mother-123',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  lineageMother: string;

  @ApiProperty({
    description: 'Lineage Father',
    example: 'Father-123',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  lineageFather: string;

  @ApiProperty({
    description: 'Offspring',
    example: 'Offspring-123',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  offspring: string;

  @ApiProperty({
    description: 'Mating Date',
    example: '2022-01-01',
    required: true
  })
  @IsDateString()
  matingDate: string;

  @ApiProperty({
    description: 'Mating Weather',
    example: 'Sunny',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  matingWeather: string;

  @ApiProperty({
    description: 'Personnel Involved',
    example: 'Ronnie Kakunguwo, Jane Doe',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  personnelInvolved: string;

  @ApiProperty({
    description: 'Notes',
    example: 'Some notes about the breeding',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  notes: string;

  @ApiProperty({
    description: 'Anticipated Birth Date',
    example: '2022-02-01',
    required: true
  })
  @IsDateString()
  anticipatedBirthDate: string;

  @ApiProperty({
    description: 'Checklist for Birth',
    example: ['Item 1', 'Item 2'],
    required: true
  })
  @IsArray()
  @IsDefined()
  checklistForBirth: [];

  @ApiProperty({
    description: 'Anticipated Heat Date',
    example: '2022-03-01',
    required: true
  })
  @IsDateString()
  anticipatedHeatDate: string;

  // New fields
  @ApiProperty({
    description: 'Sex of the animal',
    example: 'Female',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  sex: string;

  @ApiProperty({
    description: 'Fertility Status of the animal',
    example: 'Fertile',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  fertilityStatus: string;

  @ApiProperty({
    description: 'Breeding Cycle Information',
    example: 'Cycle is regular, lasts 21 days',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  breedingCycleInfo: string;

  @ApiProperty({
    description: 'Last Mating Date',
    example: '2022-01-15',
    required: true
  })
  @IsDateString()
  lastMatingDate: string;

  @ApiProperty({
    description: 'Next Expected Heat/Mating Date',
    example: '2022-02-15',
    required: true
  })
  @IsDateString()
  nextExpectedHeatMatingDate: string;
}