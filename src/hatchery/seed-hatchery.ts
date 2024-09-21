import * as mongoose from 'mongoose';
import { HatcherySchema } from './schema/hatchery.schema';
// Create a connection to the MongoDB database
const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/farmerztoolDB");

// Create the Hatchery model using the schema
const Hatchery = connection.model('Hatchery', HatcherySchema);

// Helper function to generate random date between two dates
const randomDateBetween = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper function to generate a random adminId (ObjectId)
const randomAdminId = () => {
  return new mongoose.Types.ObjectId();
};

// Seed Data Function
const seedData = async () => {
  const eggTypes = ['Chicken', 'Quail', 'Duck', 'Goose'];
  const maleBreeds = ['Breed A', 'Breed B', 'Breed C'];
  const femaleBreeds = ['Breed X', 'Breed Y', 'Breed Z'];
  const storageMethods = ['Refrigerated', 'Room Temperature'];
  const storageLocations = ['Location 1', 'Location 2', 'Location 3'];
  const eggColors = ['White', 'Brown', 'Speckled'];
  const eggSizes = ['Small', 'Medium', 'Large'];
  const eggQualities = ['A', 'B', 'C', 'D'];
  const sources = ['Livestock', 'Customer'];
  const eggsUses = ['Internal Incubation', 'Customer Incubation'];
  const purposes = ['For Sale', 'Incubation'];
  
  const numEntries = 1000; // Number of records to seed
  const data = [];

  for (let i = 0; i < numEntries; i++) {
    const eggType = eggTypes[Math.floor(Math.random() * eggTypes.length)];
    const maleBreed = maleBreeds[Math.floor(Math.random() * maleBreeds.length)];
    const femaleBreed = femaleBreeds[Math.floor(Math.random() * femaleBreeds.length)];
    const eggCollectionDate = randomDateBetween(new Date(2023, 0, 1), new Date());
    const eggQuantity = Math.floor(Math.random() * 1000) + 1; // Random quantity between 1 and 1000
    const avgWeightPerEgg = Math.random() * 10 + 40; // Avg weight between 40g and 50g
    const totalWeight = eggQuantity * avgWeightPerEgg;
    const fertilityStatus = Math.random() > 0.2; // 80% chance of fertility
    const purpose = purposes[Math.floor(Math.random() * purposes.length)];
    const eggQuality = eggQualities[Math.floor(Math.random() * eggQualities.length)];
    const eggsUse = eggsUses[Math.floor(Math.random() * eggsUses.length)];
    const storageMethod = storageMethods[Math.floor(Math.random() * storageMethods.length)];
    const storageLocation = storageLocations[Math.floor(Math.random() * storageLocations.length)];
    const eggSize = eggSizes[Math.floor(Math.random() * eggSizes.length)];
    const eggColor = eggColors[Math.floor(Math.random() * eggColors.length)];
    const pricePerEgg = Math.random() * 10 + 1; // Price between 1 and 10
    const shelfLifeExpirationDate = randomDateBetween(new Date(), new Date(2024, 12, 31));
    const batchNumber = `BATCH-${i + 1}`;
    const source = sources[Math.floor(Math.random() * sources.length)];
    
    data.push({
      adminId: randomAdminId(),
      animalType: eggType,
      maleBreed,
      femaleBreed,
      eggCollectionDate,
      eggQuantity,
      avgWeightPerEgg,
      totalWeight,
      fertilityStatus,
      eggQuality,
      purpose,
      eggsUse,
      storageMethod,
      storageLocation,
      eggSize,
      eggColor,
      pricePerEgg,
      shelfLifeExpirationDate,
      batchNumber,
      source,
      attr: {
        additionalInfo: `Extra details for batch ${i + 1}`
      }
    });
  }

  // Insert all the generated data into the Hatchery collection
  await Hatchery.insertMany(data);
  console.log(`${numEntries} hatchery records have been seeded.`);
  
  // Close the connection after the seeding is done
  connection.close();
};

// Start the seeding process
connection.on('connected', () => {
  console.log('Connected to MongoDB');
  seedData();
});

connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB:', err);
});
