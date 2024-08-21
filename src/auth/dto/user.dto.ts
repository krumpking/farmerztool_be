export class UserDto {
  //add farm name string
  fullName?: string;
  phoneNumber?: string;
  position?: string;
  dateJoined?: string;
  role?: "Admin" | "Manager" | "Finance" | "Animal Manger" | "Crop Management";
  permissions?: string[];
  email: string;
  password: string;
  farmArea?: string;
}
