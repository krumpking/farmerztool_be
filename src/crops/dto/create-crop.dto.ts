import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

// export enum CropStatus {
//   SEEDLING = 'seedling',
//   SPROUT = 'sprout',
//   MATURE = 'mature',
//   HARVESTED = 'harvested',
// }

export class GrowthRecord {
  @ApiProperty({
    description: 'Date updated',
    example: '2024-07-26T14:30:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  dateUpdated: Date;

  @ApiProperty({
    description: 'Growth stage of the crop',
    example: 'Seedling',
  })
  @IsString()
  growthStage: string;

  @ApiProperty({
    description: 'Notes about the growth',
    example: 'Healthy growth',
  })
  @IsString()
  notes: string;

  @ApiProperty({
    description: 'Weather conditions notes',
    example: 'Sunny with moderate rainfall',
  })
  @IsString()
  weatherConditionsNotes: string;
}
export class IrrigationSchedule {
  @ApiProperty({
    description: 'Days of the week when irrigation is scheduled',
    example: ['Monday', 'Wednesday', 'Friday'],
  })
  @IsArray()
  days: string[];

  @ApiProperty({
    description: 'Times of the day when irrigation is scheduled',
    example: ['08:00', '12:00', '16:00'],
  })
  @IsArray()
  times: string[];
}

export class CreateCropDto {
  @ApiProperty({
    description: 'Name of the crop which is unique',
    example: 'Tomato',
  })
  @IsString()
  cropName: string;

  @ApiProperty({
    description: 'Type of the crop',
    example: 'Vegetable',
  })
  @IsString()
  cropType: string;

  @ApiProperty({
    description: 'Type of planting',
    example: 'Greenhouse',
  })
  @IsString()
  plantingType: string;

  @ApiProperty({
    description: 'Location of the crop',
    example: 'Farm 1',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Irrigation schedule',
  })
  @ValidateNested()
  irrigationSchedule: IrrigationSchedule;

  @ApiProperty({
    description: 'Fertilizers used for the crop',
    example: ['Fertilizer 1', 'Fertilizer 2'],
  })
  @IsArray()
  fertilizersUsed: string[];

  @ApiProperty({
    description: 'Anticipated harvest date',
    example: '2024-07-26T14:30:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  anticipatedHarvestDate: Date;

  @ApiProperty({
    description: 'Status of the crop',
    example: 'germinating',
  })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Updated height/size/length of the crop',
    example: 10,
  })
  @IsNumber()
  updatedHeightSizeLength: number;


  @ApiProperty({
    description: 'Added by',
    example: 'John Doe',
  })
  @IsString()
  addedBy: string;

  @ApiProperty({ description: 'Additional attributes for the crops', example: { breed: 'Drought resistant', harvest: "3 months" } })
  @IsObject()
  attributes: any;

  @ApiProperty({
    description: 'Soil type of the crop',
    example: 'Clay',
  })
  @IsString()
  soilType: string; // new field

  @ApiProperty({
    description: 'Growth records of the crop',
  })
  @ValidateNested()
  @Type(() => GrowthRecord)
  growthRecords: GrowthRecord; 

  
}
