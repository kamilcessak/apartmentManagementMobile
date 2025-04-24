export type UserType = {
  email: string;
  isEmailVerified: boolean;
  phoneNumber: string;
  role: "Landlord" | "Tenant";
  _id: string;
};
