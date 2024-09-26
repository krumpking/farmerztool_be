import { IsString, IsNumber, IsDate, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


class MaintenanceScheduleDTO {
    @ApiProperty({
      description: 'The date of the maintenance schedule',
      example: '2022-01-01'
    })
    @IsDate()
    date: Date;
  
    @ApiProperty({
      description: 'The last updated date of the maintenance schedule',
      example: '2022-01-01T12:00:00.000Z'
    })
    @IsDate()
    lastUpdated: Date;
  
    @ApiProperty({
      description: 'The notes of the maintenance schedule',
      example: 'Oil change'
    })
    @IsString()
    notes: string;
  }

export class CreateAssetDTO {
  @ApiProperty({
    description: 'The name of the asset',
    example: 'John Deere Tractor'
  })
  @IsString()
  assetName: string;

  @ApiProperty({
    description: 'The type of asset',
    example: 'Tractor'
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The location of the asset',
    example: 'Farm 1'
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'The use of the asset',
    example: 'Agriculture'
  })
  @IsString()
  use: string;

  @ApiProperty({
    description: 'The purchase price of the asset',
    example: 10000
  })
  @IsNumber()
  purchasePrice: number;

  @ApiProperty({
    description: 'The condition of the asset',
    example: 'New'
  })
  @IsString()
  condition: string;

  @ApiProperty({
    description: 'The purchase source of the asset',
    example: 'John Deere Dealer'
  })
  @IsString()
  purchaseSource: string;

  @ApiProperty({
    description: 'The invoice details of the asset',
    example: 'Invoice #1234'
  })
  @IsString()
  invoiceDetails: string;

  @ApiProperty({
    description: 'The current value of the asset',
    example: 8000
  })
  @IsNumber()
  currentValue: number;

  @ApiProperty({
    description: 'The depreciation value of the asset',
    example: 2000
  })
  @IsNumber()
  depreciationValue: number;

  @ApiProperty({
    description: 'The depreciation time period of the asset',
    example: 'Yearly'
  })
  @IsString()
  depreciationTimePeriod: string;

  @ApiProperty({
    description: 'The user assignment of the asset',
    example: 'John Doe'
  })
  @IsString()
  userAssignment: string;

  @ApiProperty({
    description: 'The maintenance schedule of the asset this is an array',
    example: [
      {
        date: '2022-01-01',
        lastUpdated: '2022-01-01T12:00:00.000Z',
        notes: 'Oil change'
      }
    ]
  })
  @IsArray()
  @ValidateNested()
  maintenanceSchedule: MaintenanceScheduleDTO[];

  @ApiProperty({
    description: 'The inspection report submission date of the asset',
    example: '2022-01-01'
  })
  @IsDate()
  @Type(() => Date)
  inspectionReportSubmission: Date;

  @ApiProperty({
    description: 'Additional attributes of the asset object with key value pairs',
    example: { color: 'Red' }
  })
  @IsOptional()
  attributes: { [key: string]: any };
}
