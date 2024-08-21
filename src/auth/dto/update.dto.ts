export class UpdateOtp {
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  position?: string;
  dateJoined?: string;
  role?: "Admin" | "Manager" | "Finance" | "Animal Manger" | "Crop Management";
  permissions?: string[];
  farmArea?: string;
}