export type TenantType = {
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  invitationCode: string;
  isActive: boolean;
  owner: string;
  phoneNumber: string;
  _id: string;
  assignedApartmentID: string | null;
};

export type GetTenantsResponseType = TenantType[];
