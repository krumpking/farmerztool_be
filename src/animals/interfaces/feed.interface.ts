import { Document } from 'mongoose';

export interface Feed extends Document {
  readonly animal: string; // Animal
  readonly adminId: string; // Admin ID
  readonly animalId: string; // Animal ID
  readonly addedBy: string; // Added by ID
  readonly feedName: string; // Feed Name
  readonly barcode: string; // Barcode/ID
  readonly source: string; // Source
  readonly feedType: string; // Feed Type (liquid, pellets, grain, powder)
  readonly animalStage: string; // Animal Stage (starter, grower, finisher, supplement)
  readonly nutrientsInFeed: { nutrient: string; percentage: number }[]; // Nutrients in Feed
  readonly initialAmountOfFeed: number; // Initial Amount of feed in kgs
  readonly totalCostOfFeedBatch: number; // Total Cost of Feed Batch
  readonly totalAvailableFeed: number; // Total available feed in kgs
  readonly consumption: { totalConsumed: number; date: string }[]; // Consumption records
  readonly costPerAnimalDaily: number; // Cost per Animal (Daily)
  readonly costPerAnimalPerMeal: number; // Cost per Animal (Per Meal)
  readonly startDateOnFeed: string; // Start Date on Feed
  readonly lastDate?: string; // Last Date (if applicable)
  readonly totalTimeOnFeed?: string; // Total Time on Feed
  readonly feedSchedule: { day: string; expectedAmount: number; times: string[] }[]; // Feed schedule
}