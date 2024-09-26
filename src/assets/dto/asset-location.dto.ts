import { IsArray, IsDate, IsLatitude, IsLongitude, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class LocationDouble {
  @IsLatitude()
  @ApiProperty({
    description: 'Latitude of the location',
    example: 37.7749,
  })
  latitude: number;

  @IsLongitude()
  @ApiProperty({
    description: 'Longitude of the location',
    example: -122.4194,
  })
  longitude: number;
}

export class AssetLocationHistoryDto {
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Date of the location history entry',
    example: '2022-01-01T00:00:00.000Z',
  })
  date: Date;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Location coordinates',
  })
  locationDouble: LocationDouble;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Optional notes for the location history entry',
    example: 'Asset was moved to a new location',
  })
  notes?: string;
}

export class AssetUserAssignmentDto {
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Start time of the user assignment',
    example: '2022-01-01T00:00:00.000Z',
  })
  startTime: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({
    description: 'Optional finish time of the user assignment',
    example: '2022-01-02T00:00:00.000Z',
  })
  finishTime?: Date;
}

export class AssetUsageLogDto {
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Date of the usage log entry',
    example: '2022-01-01T00:00:00.000Z',
  })
  date: Date;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Optional notes for the usage log entry',
    example: 'Asset was used for a specific task',
  })
  usageNotes?: string;
}

export class CreateAssetLocationDto {
  @IsArray()
  @ApiProperty({
    description: 'Array of location history entries',
    type: AssetLocationHistoryDto,
    isArray: true,
  })
  locationHistory: AssetLocationHistoryDto[];

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Optional user assignment details',
    type: AssetUserAssignmentDto,
  })
  userAssignment?: AssetUserAssignmentDto;

  @IsArray()
  @ApiProperty({
    description: 'Array of usage log entries',
    type: AssetUsageLogDto,
    isArray: true,
  })
  usageLogs: AssetUsageLogDto[];
}