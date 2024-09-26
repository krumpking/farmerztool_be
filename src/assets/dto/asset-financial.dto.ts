import { IsNotEmpty, IsNumber, IsString, IsDate, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CostDTO {
  @ApiProperty({
    description: 'Type of cost (e.g. maintenance, repair, etc.)',
    example: 'Maintenance'
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Date of the cost',
    example: '2022-01-01T00:00:00.000Z'
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Amount of the cost',
    example: 100.00
  })
  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @ApiProperty({
    description: 'Description of the cost',
    example: 'Regular maintenance check'
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateAssetFinancialDTO {

  @ApiProperty({
    description: 'Purchase price of the asset',
    example: 10000.00
  })
  @IsNotEmpty()
  @IsNumber()
  purchasePrice: number;

  @ApiProperty({
    description: 'Depreciation value of the asset',
    example: 2000.00
  })
  @IsNotEmpty()
  @IsNumber()
  depreciationValue: number;

  @ApiProperty({
    description: 'Depreciation time period of the asset',
    example: 'Yearly'
  })
  @IsNotEmpty()
  @IsString()
  depreciationTimePeriod: string;

  @ApiProperty({
    description: 'Current value of the asset',
    example: 8000.00
  })
  @IsNotEmpty()
  @IsNumber()
  currentValue: number;

  @ApiProperty({
    description: 'Array of costs associated with the asset',
    example: [
      {
        type: 'Maintenance',
        date: '2022-01-01T00:00:00.000Z',
        cost: 100.00,
        description: 'Regular maintenance check'
      }
    ]
  })
  @IsArray()
  @ValidateNested()
  costs: CostDTO[];
}