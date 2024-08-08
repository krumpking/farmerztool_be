export class CreateFarmDto {
  //add farm name string
  adminId: string;
  farmName: string;
  farmerName:string;
  farmerAge:number;
  farmerPhoneNumber: string;
  locationCity: string;
  locationStateProvince: string;
  locationCountry: string;
  numberOfEmployees: number;
  uploadLogo: string;
  areaSize: string;
  animals: string[];
  crops: string[];
  dateEstablished: String;
}
