export interface AnimalRequest extends Document {
    readonly adminId: string;
    readonly addedBy: string;
    readonly date: string;
    readonly animalId: string;
    readonly animaltype: string;
    readonly attr: any;
    readonly age: number;
    readonly healthStatus: "excellent" | "very good" | "good" | "fair" | "poor";
    readonly status: "pending" | "approved" | "rejected";
  }