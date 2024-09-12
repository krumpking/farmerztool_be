import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CropActivityDto {
  @ApiProperty({
    description: 'The type of activity (e.g. planting, watering, harvesting)',
    example: 'planting'
  })
  @IsEnum(['planting', 'watering', 'harvesting'])
  @IsNotEmpty()
  @IsString()
  activityType: string;

  @ApiProperty({
    description: 'The date of the activity',
    example: '2023-03-14'
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'The quantity of the activity (e.g. number of plants, amount of water, weight of harvest)',
    example: 50
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  amountQuantity: number;

  @ApiProperty({
    description: 'The method used for the activity (e.g. drip irrigation, manual watering)',
    example: 'drip irrigation'
  })
  @IsString()
  @IsNotEmpty()
  method: string;

  @ApiProperty({
    description: 'The source of the activity (e.g. well, rain, river)',
    example: 'well'
  })
  @IsString()
  @IsNotEmpty()
  sourcedFrom: string;

  @ApiProperty({
    description: 'The price of the activity (e.g. cost of seeds, water, labor)',
    example: 10.5
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'The time of the activity (e.g. morning, afternoon, evening)',
    example: 'morning'
  })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({
    description: 'The response from the crop (e.g. growth, yield, health)',
    example: 'healthy growth'
  })
  @IsString()
  @IsNotEmpty()
  responseFromCrop: string;

  @ApiProperty({
    description: 'The data from the IoT device (e.g. temperature, humidity, light levels)',
    example: '{"temperature": 25, "humidity": 50, "light": 500}'
  })
  @IsString()
  @IsOptional()
  IoTDeviceData: string;

  @ApiProperty({
    description: 'The square footage of the area where the activity was performed',
    example: 1000
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  squareFootage: number;

  @ApiProperty({
    description: 'The tonnage of the crop produced from the activity',
    example: 2
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  tonnage: number;
}