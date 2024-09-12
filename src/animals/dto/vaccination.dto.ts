import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsArray} from 'class-validator';

export class CreateVaccinationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the admin who created the vaccination record',
    example: 'RK',
  })
  adminId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the animal that received the vaccination',
    example: '002',
  })
  animalId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the user who added the vaccination record',
    example: 'Ronnie Kakunguwo',
  })
  addedBy: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the vaccine',
    example: 'Rabies',
  })
  vaccineName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The manufacturer of the vaccine',
    example: 'Farm n City',
  })
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The IoT number of the vaccine',
    example: 'ABC123',
  })
  iotNumber: string;

  @IsString()
  @ApiProperty({
    description: 'The expiration date of the vaccine',
    example: '2025-12-31T00:00:00.000Z',
  })
  expirationDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The barcode of the vaccine',
    example: '1234567890',
  })
  barcode: string;

  @IsArray()
  @ApiProperty({
    description: 'The dates when the vaccine was administered',
    example: ['2022-01-01T00:00:00.000Z', '2022-02-01T00:00:00.000Z'],
  })
  datesAdminstered: string[];
}