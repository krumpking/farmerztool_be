import { IsString, IsNotEmpty, IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedDto {
  @ApiProperty({
    description: 'The ID of the user who added the feed',
    example: 'user-123',
  })
  @IsString()
  @IsNotEmpty()
  addedBy: string;

  @ApiProperty({
    description: 'The name of the feed',
    example: 'Premium Dog Food',
  })
  @IsString()
  @IsNotEmpty()
  feedName: string;

  @ApiProperty({
    description: 'The barcode or ID associated with the feed',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @ApiProperty({
    description: 'The source of the feed (e.g., manufacturer, supplier, etc.)',
    example: 'Purina',
  })
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({
    description: 'The type of feed (e.g., liquid, pellets, grain, powder)',
    example: 'dry',
  })
  @IsString()
  @IsNotEmpty()
  feedType: string;

  @ApiProperty({
    description: 'The stage of the animal (e.g., starter, grower, finisher, supplement)',
    example: 'starter',
  })
  @IsString()
  @IsNotEmpty()
  animalStage: string;

  @ApiProperty({
    description: 'An array of nutrients in the feed with their percentages',
    example: [{ nutrient: 'Protein', percentage: 30 }, { nutrient: 'Fat', percentage: 20 }],
  })
  @IsArray()
  nutrientsInFeed: { nutrient: string; percentage: number }[];

  @ApiProperty({
    description: 'The initial amount of feed in kgs',
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty()
  initialAmountOfFeed: number;

  @ApiProperty({
    description: 'The total cost of the feed batch',
    example: 100.5,
  })
  @IsNumber()
  @IsNotEmpty()
  totalCostOfFeedBatch: number;

  @ApiProperty({
    description: 'The total available feed in kgs',
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty()
  totalAvailableFeed: number;

  @ApiProperty({
    description: 'An array of consumption records',
    example: [{ totalConsumed: 5, date: '2023-10-01' }],
  })
  @IsArray()
  consumption: { totalConsumed: number; date: string }[];

  @ApiProperty({
    description: 'The daily cost per animal',
    example: 2.5,
  })
  @IsNumber()
  @IsNotEmpty()
  costPerAnimalDaily: number;

  @ApiProperty({
    description: 'The cost per animal per meal',
    example: 1.0,
  })
  @IsNumber()
  @IsNotEmpty()
  costPerAnimalPerMeal: number;

  @ApiProperty({
    description: 'The start date on feed',
    example: '2023-10-01',
  })
  @IsString()
  @IsNotEmpty()
  startDateOnFeed: string;

  @ApiProperty({
    description: 'The last date on feed, if applicable',
    example: '2023-10-31',
  })
  @IsString()
  @IsOptional()
  lastDate?: string;

  @ApiProperty({
    description: 'The total time on feed',
    example: '30 days',
  })
  @IsString()
  @IsOptional()
  totalTimeOnFeed?: string;

  @ApiProperty({
    description: 'An array of feed schedule records',
    example: [{ day: 'Monday', expectedAmount: 10, times: ['08:00', '12:00', '18:00'] }],
  })
  @IsArray()
  feedSchedule: { day: string; expectedAmount: number; times: string[] }[];
}