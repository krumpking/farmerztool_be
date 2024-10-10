import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject, IsNumber } from 'class-validator';

export class CreateAnimalRequestDto {

  @ApiProperty({
    description: 'Unique identifier for the animal added by farmer',
    example: 'ANML-12345'
  })
  @IsString()
  @IsNotEmpty()
  animalId: string;

  @ApiProperty({ description: 'User  who added the animal', example: 'Ronnie Kakunguwo' })
  @IsString()
  @IsNotEmpty()
  addedBy: string;

  @ApiProperty({ description: 'Type of animal', example: 'Cow' })
  @IsString()
  @IsNotEmpty()
  animaltype: string;

  @ApiProperty({ description: 'Age of the animal', example: 3 })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: 'Health status of the animal. NB include these values: excellent, very good, good, fair, poor',
    enum: ["excellent", "very good", "good", "fair", "poor"],
    example: 'good'
  })
  @IsString()
  @IsNotEmpty()
  healthStatus: string;

  @ApiProperty({
    description: 'Status of the animal.NB: include these values: pending, approved, rejected',
    enum: ["pending", "approved", "rejected"],
    default: "pending",
    example: 'pending'
  })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Additional attributes for the animal', example: { breed: 'HardMashona', age: 3 } })
  @IsObject()
  attr: any;
}