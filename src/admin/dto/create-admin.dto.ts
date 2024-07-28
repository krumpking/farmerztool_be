export class CreateFarmDto {
  //add farm name string
  adminId: string;
  farmName: string;
  location: string;
  numberOfEmployees: number;
  logo: string;
  areaSize: string;
  animals: string[];
  crops: string[];
  dateEstablished: Date;
}
