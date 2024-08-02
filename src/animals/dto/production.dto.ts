export class CreateProductionDto {
  adminId: string;
  addedBy: string;
  animalId: string;
  productionType: string;
  meatProduction: {}; //Current Weight: 200kg, Estimated Slaughter Weight: 250kg, Expected Slaughter Date: 30th August 2024, Yield: 150kg meat.
  milkProduction: {}; //Daily Yield: 20 liters, Total Yield: 500 liters, Purpose: Sale.
  woolFurProduction: {}; //Shearing Date: 1st July 2024, Quantity: 10kg, Quality: High, Sold to: ABC Wool Co.
  salesRecords: [
    // Sale Record: Product: Beef, Buyer: Local Market, Price: $500, Date: 5th July 2024
  ];
}
