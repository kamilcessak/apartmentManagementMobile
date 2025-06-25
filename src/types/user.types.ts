export type UserType = {
  email: string;
  isEmailVerified: boolean;
  phoneNumber: string;
  role: "Landlord" | "Tenant";
  _id: string;
  firstName?: string;
  lastName?: string;
  apartments: { isAvailable: boolean }[];
};
