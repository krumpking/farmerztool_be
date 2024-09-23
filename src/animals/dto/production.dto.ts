import { IsString, IsNumber, IsDate, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class MeatProduction {
  @ApiProperty({ description: 'Current weight', example: 100 })
  @IsNumber()
  @IsOptional()
  currentWeight?: number; // in kg

  @ApiProperty({ description: 'Estimated slaughter weight', example: 120 })
  @IsNumber()
  @IsOptional()
  estimatedSlaughterWeight?: number; // in kg

  @ApiProperty({ description: 'Expected slaughter date', example: '2022-01-01' })
  @IsDate()
  @Type(() => Date)
  expectedSlaughterDate?: Date;

  @ApiProperty({ description: 'Yield', example: 50 })
  @IsNumber()
  totalYield?: number; // in kg
}

class MilkProduction {
  @ApiProperty({ description: 'Daily yield', example: 20 })
  @IsNumber()
  dailyYield: number; // in liters

  @ApiProperty({ description: 'Total yield', example: 100 })
  @IsNumber()
  totalYield: number; // in liters

  @ApiProperty({ description: 'Purpose', example: 'Sale' })
  @IsString()
  purpose: string; // e.g. Sale
}

class WoolFurProduction {
  @ApiProperty({ description: 'Shearing date', example: '2022-02-01' })
  @IsDate()
  @Type(() => Date)
  shearingDate: Date;

  @ApiProperty({ description: 'Quantity', example: 10 })
  @IsNumber()
  quantity: number; // in kg

  @ApiProperty({ description: 'Quality', example: 'High' })
  @IsString()
  quality: string; // e.g. High

  @ApiProperty({ description: 'Sold to', example: 'ABC Wool Co.' })
  @IsString()
  soldTo: string; // e.g. ABC Wool Co.
}

class SalesRecord {
  @ApiProperty({ description: 'Product', example: 'Beef' })
  @IsString()
  product: string; // e.g. Beef

  @ApiProperty({ description: 'Buyer', example: 'Local Market' })
  @IsString()
  buyer: string; // e.g. Local Market

  @ApiProperty({ description: 'Price', example: 500 })
  @IsNumber()
  price: number; // e.g. $500

  @ApiProperty({ description: 'Date', example: '2022-03-01' })
  @Type(() => Date)
  @IsDate()
  date: Date;
}

export class CreateProductionDto {
  @ApiProperty({ description: 'Added by', example: 'Ronnie Kakunguwo' })
  @IsString()
  addedBy: string;

  @ApiProperty({ description: 'Animal ID', example: 'animal-456' })
  @IsString()
  animalId: string;

  @ApiProperty({ description: 'Production type', example: 'Meat' })
  @IsString()
  productionType: string;

  @ApiProperty({ description: 'Meat production details', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => MeatProduction)
  meatProduction?: MeatProduction;

  @ApiProperty({ description: 'Milk production details', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => MilkProduction)
  milkProduction?: MilkProduction;

  @ApiProperty({ description: 'Wool/Fur production details', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => WoolFurProduction)
  woolFurProduction?: WoolFurProduction;

  @ApiProperty({ description: 'Sales records', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => SalesRecord)
  salesRecords?: SalesRecord;
}