import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

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
}