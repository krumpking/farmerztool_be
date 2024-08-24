import { 
  IsString, 
  IsDateString, 
  IsArray, 
  IsOptional, 
  IsIn, 
  IsNotEmpty, 
  IsDefined 
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBreedingDto {
  @ApiProperty({
    description: 'Admin ID',
    example: 'admin-123',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  adminId: string;

  @ApiProperty({
    description: 'Animal ID',
    example: 'animal-123',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  animalId: string;

  @ApiProperty({
    description: 'Added by',
    example: 'John Doe',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  addedBy: string;

  @ApiProperty({
    description: 'Courtship',
    example: 'Successful',
    required: true
  })
  @IsString()
  @IsIn(['Successful', 'Unsuccessful'])
  courtship: string;

  @ApiProperty({
    description: 'Mating',
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
    example: 'John Doe, Jane Doe',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  personnelInvolved: string;

  @ApiProperty({
    description: 'Notes',
    example: 'Some notes about the breeding',
    required: false
  })
  @IsOptional()
  @IsString()
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
}