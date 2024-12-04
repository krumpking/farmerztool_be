import { IsString, IsNumber, IsArray, IsOptional, IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class DoseDto {
    @ApiProperty({ example: 'daily', description: 'Type of dosage (daily, weekly, monthly, yearly)' })
    @IsEnum(['daily', 'weekly', 'monthly', 'yearly'])
    dosageType: 'daily' | 'weekly' | 'monthly' | 'yearly';

    @ApiProperty({ example: 2, description: 'Frequency of doses' })
    @IsNumber()
    frequency: number;

    @ApiProperty({ example: '2023-10-01', description: 'Exact dates for the doses' })
    @IsString()
    exactDates: string;
}

class TreatmentDetailsDto {
    @ApiProperty({ example: 'Rabies', description: 'Description of the health condition or illness being addressed' })
    @IsString()
    conditionTreated: string;

    @ApiProperty({ example: 'Prevent rabies infection', description: 'Expected outcome or goal of the treatment' })
    @IsString()
    intendedCure: string;

    @ApiProperty({ example: 'Keep the animal calm for 24 hours', description: 'Any special instructions for post-treatment care' })
    @IsString()
    additionalCareInstructions: string;
}

class DurationDto {
    @ApiProperty({ example: '2023-10-01T10:00:00Z', description: 'Date and time when the treatment began' })
    @IsString()
    startTime: string;

    @ApiProperty({ example: '2023-10-15T10:00:00Z', description: 'Date and time when the treatment is expected to or has concluded' })
    @IsString()
    endTime: string;

    @ApiProperty({ example: 2, description: 'Total length of time for the treatment course (measured in months)' })
    @IsNumber()
    duration: number;
}

class SurgicalDetailsDto {
    @ApiProperty({ example: 'Spay', description: 'Name or type of surgery performed' })
    @IsString()
    surgeryType: string;

    @ApiProperty({ example: '2023-10-05', description: 'Date of the surgical procedure' })
    @IsString()
    dateOfSurgery: string;

    @ApiProperty({ example: 'Prevent unwanted litters', description: 'The medical reason or condition that required surgery' })
    @IsString()
    reasonForSurgery: string;

    @ApiProperty({ example: 'Successful, no complications', description: 'Notes on the outcome and any complications' })
    @IsString()
    outcomeOfSurgery: string;

    @ApiProperty({ example: 'Limit activity for 2 weeks', description: 'Specific care instructions after surgery' })
    @IsString()
    postOperativeCare: string;
}

class CostOfCareDto {
    @ApiProperty({ example: 150, description: 'Total cost of the treatment, surgery, or medication administered' })
    @IsNumber()
    costOfTreatment: number;

    @ApiProperty({ example: 1, description: 'Number of animals' })
    @IsNumber()
    numberOfAnimals: number;

    @ApiProperty({ example: 150, description: 'Cost per animal inferred from total cost and number of animals' })
    @IsNumber()
    costPerAnimal: number;
}


export class CreateAnimalHealthDto {

    @ApiProperty({ example: 'Vaccination', description: 'Name of the treatment' })
    @IsString()
    treatmentName: string;

    @ApiProperty({ example: 'Rabies Vaccine', description: 'Name of the medication or drug' })
    @IsString()
    medicationName: string;

    @ApiProperty({ example: 'Animal Health Clinic', description: 'Name of the health care provider or clinic' })
    @IsString()
    provider: string;

    @ApiProperty({ example: '123456789', description: 'Vaccine/medicine barcode' })
    @IsString()
    barcodeTag: string;

    @ApiProperty({ example: '2023-10-01', description: 'The date the treatment or medication was administered' })
    @IsDate()
    @Type(() => Date)
    dateAdministered: Date;

    @ApiProperty({ example: 'Dr. Smith', description: 'The veterinarian or person responsible for administering the care' })
    @IsString()
    personVet: string;

    @ApiProperty({ example: 'Injection', description: 'Method of care delivery (e.g., Injection, Oral, Food Mix, Surgery)' })
    @IsString()
    typeOfAdministration: string;

    @ApiProperty({ example: 'Awake', description: 'Status of the animal at the time of administration (Awake, Asleep, Sedated, etc.)' })
    @IsString()
    animalStatus: string;

    @ApiProperty({ example: 'mg', description: 'String (e.g., in mg, ml, or number of pills) for quantity measurement' })
    @IsString()
    quantityMeasurement: string;

    @ApiProperty({ example: 5, description: 'Amount of medication provided' })
    @IsNumber()
    quantity: number;

    @ApiProperty({
        type: [DoseDto],
        description: 'Number of doses to be given, along with the frequency (e.g., 2 doses per day)',
    })
    @IsArray()
    doses: DoseDto[];

    @ApiProperty({ type: TreatmentDetailsDto, description: 'Details about the treatment' })
    treatmentDetails: TreatmentDetailsDto;

    @ApiProperty({ type: DurationDto, description: 'Duration of the treatment' })
    duration: DurationDto;

    @ApiProperty({ type: SurgicalDetailsDto, description: 'Surgical details if applicable' })
    @IsOptional()
    surgicalDetails?: SurgicalDetailsDto;

    @ApiProperty({ type: CostOfCareDto, description: 'Cost of care details' })
    costOfCare: CostOfCareDto;
}