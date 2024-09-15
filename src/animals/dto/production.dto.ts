import { IsString, IsNumber, IsDate, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class MeatProduction {
  @ApiProperty({ description: 'Current weight', example: 100 })
  @IsNumber()
  @IsOptional()
  currentWeight?: number | null; // in kg

  @ApiProperty({ description: 'Estimated slaughter weight', example: 120 })
  @IsNumber()
  @IsOptional()
  estimatedSlaughterWeight?: number | null; // in kg

  @ApiProperty({ description: 'Expected slaughter date', example: '2022-01-01' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  expectedSlaughterDate?: Date | null;
 
  @ApiProperty({ description: 'Yield', example: 50 })
  @IsNumber()
  @IsOptional()
  yield?: number  | null; // in kg
}

class MilkProduction {
  @ApiProperty({ description: 'Daily yield', example: 20 })
  @IsNumber()
  @IsOptional()
  dailyYield: number; // in liters

  @ApiProperty({ description: 'Total yield', example: 100 })
  @IsNumber()
  @IsOptional()
  totalYield: number; // in liters

  @ApiProperty({ description: 'Purpose', example: 'Sale' })
  @IsString()
  @IsOptional()
  purpose: string; // e.g. Sale
}

class WoolFurProduction {
  @ApiProperty({ description: 'Shearing date', example: '2022-02-01' })
  @IsDate()
  @IsOptional() 
  @Type(() => Date)
  shearingDate: Date;

  @ApiProperty({ description: 'Quantity', example: 10 })
  @IsNumber()
  @IsOptional()
  quantity: number; // in kg

  @ApiProperty({ description: 'Quality', example: 'High' })
  @IsString()
  @IsOptional()
  quality: string; // e.g. High

  @ApiProperty({ description: 'Sold to', example: 'ABC Wool Co.' })
  @IsString()
  @IsOptional()
  soldTo: string; // e.g. ABC Wool Co.
}

class SalesRecord {
  @ApiProperty({ description: 'Product', example: 'Beef' })
  @IsString()
  @IsOptional() 
  product: string; // e.g. Beef

  @ApiProperty({ description: 'Buyer', example: 'Local Market' })
  @IsString()
  @IsOptional()
  buyer: string; // e.g. Local Market

  @ApiProperty({ description: 'Price', example: 500 })
  @IsNumber()
  @IsOptional()
  price: number; // e.g. $500

  @ApiProperty({ description: 'Date', example: '2022-03-01' })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date: Date;
}

export class CreateProductionDto {
  @ApiProperty({ description: 'Admin ID', example: 'admin-123' })
  @IsString()
  adminId: string;

  @ApiProperty({ description: 'Added by', example: 'Ronnie Kakunguwo' })
  @IsString()
  addedBy: string;

  @ApiProperty({ description: 'Animal ID', example: 'animal-456' })
  @IsString()
  animalId: string;

  @ApiProperty({ description: 'Production type', example: 'Meat' })
  @IsString()
  productionType: string;

  @ApiProperty({ description: 'Meat production details' })
  @IsOptional()
  @ValidateNested()
  @Type(() => MeatProduction)
  meatProduction?: MeatProduction | null;

  @ApiProperty({ description: 'Milk production details' })
  @IsOptional()
  @ValidateNested()
  @Type(() => MilkProduction)
  milkProduction?: MilkProduction | null;

  @ApiProperty({ description: 'Wool/Fur production details' })
  @IsOptional()
  @ValidateNested()
  @Type(() => WoolFurProduction)
  woolFurProduction?: WoolFurProduction | null;

  @ApiProperty({ description: 'Sales records', isArray: true })
  @IsArray()
  @ValidateNested()
  @Type(() => SalesRecord)
  salesRecords?: SalesRecord  | null;
}