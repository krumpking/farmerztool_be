import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDate, IsBoolean, IsOptional, IsIn } from 'class-validator';

export class CreateReminderDTO {
  @IsString()
  @ApiProperty({
    description: 'Name of the collection (e.g., "Egg Hatchery")',
    example: 'Egg Hatchery',
  })
  collectionName: string;

  @IsString()
  @ApiProperty({
    description: 'Title of the reminder',
    example: 'Turn Eggs',
  })
  reminderTitle: string;

  @IsString()
  @ApiProperty({
    description: 'Category of the reminder (e.g., "Turning Eggs", "Checking Humidity")',
    example: 'Turning Eggs',
  })
  reminderCategory: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Additional notes for the reminder',
    example: 'Make sure to turn eggs gently',
  })
  reminderNotes?: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Date of the reminder',
    example: '2023-03-15T14:30:00.000Z',
  })
  reminderDate: Date;

  @IsString()
  @IsIn(['DAILY', 'WEEKLY', 'MONTHLY'])
  @ApiProperty({
    description: 'Frequency of the reminder (DAILY, WEEKLY, MONTHLY)',
    example: 'DAILY',
  })
  reminderFrequency: string;


  @IsString()
  @ApiProperty({
    description: 'Time of the reminder (HH:mm)',
    example: '14:30',
  })
  reminderTime: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Whether the reminder is valid or not',
    example: true,
  })
  isReminderValid: boolean;

  @IsString()
  @ApiProperty({
    description: 'Reminder message',
    example: 'Do not forget to turn the eggs!',
  })
  reminder: string;
}