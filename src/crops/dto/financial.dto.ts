import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CostDTO {
  @ApiProperty({ description: 'Date of the cost', example: '2022-01-01' })
  @IsString()
  @Type(() => Date)
  date: string;

  @ApiProperty({ description: 'Title of the cost', example: 'Fertilizer' })
  @IsString()
  costTitle: string;

  @ApiProperty({ description: 'Description of the cost', example: 'Fertilizer application' })
  @IsString()
  costDescription: string;

  @ApiProperty({ description: 'Amount of the cost', example: 100.00 })
  @IsNumber()
  costAmount: number;
}

export class CreateFinancialDto {
  @ApiProperty({ description: 'Type of crop', example: 'Wheat' })
  @IsString()
  cropType: string;

  @ApiProperty({ description: 'Size of the area where the crop is grown', example: 100.00 })
  @IsNumber()
  areaSize: number;

  @ApiProperty({ description: 'Yield of the crop in tonnes', example: 500.00 })
  @IsNumber()
  yieldInTonnes: number;

  @ApiProperty({ description: 'Revenue generated from the crop in USD', example: 10000.00 })
  @IsNumber()
  revenueInUSD: number;

  @ApiProperty({ description: 'Array of cost objects', example: [{ date: '2022-01-01', costTitle: 'Fertilizer', costDescription: 'Fertilizer application', costAmount: 100.00 }] })
  @IsArray()
  @ValidateNested()
  costs: CostDTO[];
}