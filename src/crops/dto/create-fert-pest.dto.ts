import { IsString, IsNumber, IsEnum, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateFertiliserPesticideDTO {
  @ApiProperty({
    description: 'Record type (Fertilizer or Pesticide)',
    example: 'Fertilizer',
    enum: ['Fertilizer', 'Pesticide'],
  })
  @IsEnum(['Fertilizer', 'Pesticide'])
  recordType: 'Fertilizer' | 'Pesticide';

  @ApiProperty({
    description: 'Area covered',
    example: 100,
  })
  @IsNumber()
  areaCovered: number;

  @ApiProperty({
    description: 'Estimated amount',
    example: 50,
  })
  @IsNumber()
  estimatedAmount: number;

  @ApiProperty({
    description: 'Added by',
    example: 'Ronnie Kakunguwo',
  })
  @IsString()
  addedBy: string;

  @ApiProperty({
    description: 'Admin ID',
    example: 'admin123',
  })
  @IsString()
  adminId: string;

  @ApiProperty({
    description: 'Notes',
    example: 'Some notes about the record',
  })
  @IsString()
  notes: string;

  @ApiProperty({
    description: 'Date (automatically set to current date)',
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date?: Date;
}