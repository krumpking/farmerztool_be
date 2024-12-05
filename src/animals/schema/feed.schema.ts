import * as mongoose from 'mongoose';

export const FeedSchema = new mongoose.Schema({
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: true
  },
  adminId: { type: mongoose.Schema.Types.String, ref: 'Users', required: true },
  animalId: { type: String, required: true }, // Animal ID
  addedBy: { type: String, required: true }, // Added by ID
  feedName: { type: String, required: true }, // Feed Name
  barcode: { type: String, required: true }, // Barcode/ID
  source: { type: String, required: true }, // Source
  feedType: { type: String, required: true }, // Feed Type (liquid, pellets, grain, powder)
  animalStage: { type: String, required: true }, // Animal Stage (starter, grower, finisher, supplement)
  nutrientsInFeed: [{ nutrient: { type: String, required: true }, percentage: { type: Number, required: true } }], // Nutrients in Feed
  initialAmountOfFeed: { type: Number, required: true }, // Initial Amount of feed in kgs
  totalCostOfFeedBatch: { type: Number, required: true }, // Total Cost of Feed Batch
  totalAvailableFeed: { type: Number, required: true }, // Total available feed in kgs
  consumption: [{ totalConsumed: { type: Number, required: true }, date: { type: String, required: true } }], // Consumption
  costPerAnimalDaily: { type: Number, required: true }, // Cost per Animal (Daily)
  costPerAnimalPerMeal: { type: Number, required: true }, // Cost per Animal (Per Meal)
  startDateOnFeed: { type: String, required: true }, // Start Date on Feed
  lastDate: { type: String }, // Last Date (if applicable)
  totalTimeOnFeed: { type: String }, // Total Time on Feed
  feedSchedule: [{ day: { type: String, required: true }, expectedAmount: { type: Number, required: true }, times: [{ type: String, required: true }] }], // Feed schedule
}, {
  timestamps: true
});