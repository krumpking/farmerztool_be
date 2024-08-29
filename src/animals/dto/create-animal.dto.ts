import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateAnimalDto {

  @ApiProperty({
    description: 'Unique identifier for the animal',
    example: 'ANML-12345'
  })
  @IsString()
  @IsNotEmpty()
  animalId: string;

  @ApiProperty({ description: 'User who added the animal', example: 'Ronnie Kakunguwo' })
  @IsString()
  @IsNotEmpty()
  addedBy: string;

  @ApiProperty({ description: 'Admin user ID', example: 'ADMIN-123' })
  @IsString()
  @IsNotEmpty()
  adminId: string;

  @ApiProperty({ description: 'Type of animal', example: 'Cow' })
  @IsString()
  @IsNotEmpty()
  animaltype: string;

  @ApiProperty({ description: 'Additional attributes for the animal', example: { breed: 'HardMashona', age: 3 } })
  @IsObject()
  attr: any;
}