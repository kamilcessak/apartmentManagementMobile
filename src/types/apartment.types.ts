export type ApartmentType = {
  _id: string;
  address: string;
  description: string;
  documents: string[];
  equipment: string;
  isAvailable: boolean;
  metric: number;
  monthlyCost: number;
  owner: string;
  photos: string[];
  roomCount: number;
};

export type CreateApartmentType = {
  address: string;
  metric: number;
  roomCount: number;
  monthlyCost: number;
  description: string;
  equipment?: string;
  photos?: string[];
  documents?: string[];
};

export type GetApartmentsResponseType = ApartmentType[];
export type GetApartmentResponseType = ApartmentType;
