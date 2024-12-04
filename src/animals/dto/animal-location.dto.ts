import { IsDate, IsLatitude, IsLongitude, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class TimeInCurrentLocationDTO {
  @ApiProperty({
    description: 'The name of the location',
    type: String,
    example: 'Previous Location',
    required: true,
  })
  @IsString()
  locationName: string;

  @ApiProperty({
    description: 'The date when the location was updated',
    type: Date,
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  dateUpdated: Date;
}

export class LocationDTO {
  @ApiProperty({
    description: 'The date of the location',
    type: Date,
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'The latitude of the location',
    type: Number,
    example: 37.7749,
    required: true,
  })
  @IsLatitude()
  lat: number;

  @ApiProperty({
    description: 'The longitude of the location',
    type: Number,
    example: -122.4194,
    required: true,
  })
  @IsLongitude()
  lng: number;

  // new fields

  @ApiProperty({
    description: 'The total number of animals housed at the current location',
    type: Number,
    example: 10,
    required: true,
  })
  @IsNumber()
  numberOfAnimalsHoused: number;

  @ApiProperty({
    description: 'The date when the location was added',
    type: Date,
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  dateAdded: Date;

  @ApiProperty({
    description: 'Time spent in the current location',
    type: [TimeInCurrentLocationDTO],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeInCurrentLocationDTO)
  timeInCurrentLocation: TimeInCurrentLocationDTO[];
}