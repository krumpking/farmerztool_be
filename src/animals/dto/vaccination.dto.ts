export class CreateVaccinationDto {
  adminId: string;
  animalId: string;
  addedBy: string;
  vaccineName: string;
  manufacturer: string;
  iotNumber: string;
  expirationDate: string;
  barcode: string;
  datesAdminstered: string[];
}
