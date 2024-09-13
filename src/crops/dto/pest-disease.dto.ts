import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePestDiseaseIssueDto {
  @ApiProperty({
    description: 'The type of issue (pest or disease)',
    example: 'pest',
    enum: ['pest', 'disease'],
  })
  @IsEnum(['pest', 'disease'])
  @IsNotEmpty()
  issueType: 'pest' | 'disease';

  @ApiProperty({
    description: 'The severity of the issue',
    example: 'high',
  })
  @IsString()
  @IsNotEmpty()
  severity: string;

  @ApiProperty({
    description: 'The area affected by the issue',
    example: '10 acres',
  })
  @IsString()
  @IsNotEmpty()
  areaAffected: string;

  @ApiProperty({
    description: 'Additional notes about the issue',
    example: 'Some additional information about the issue',
  })
  @IsString()
  @IsOptional()
  notes: string;
}