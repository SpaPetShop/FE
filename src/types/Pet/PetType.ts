export type TPetType = {
    id: string;
    name: string;
    description: string;
    status: string;
    type: string;
  };
  
  export type FilterTPetType = {
    Name?: string;
    Description?: string;
    Status?: string;
    page: number;
    size: number;
  };
  
  export type TPetResponse = {
    size: number;
    page: number;
    total: number;
    totalPages: number;
    items: TPetType[];
  };

  export type PetType = {
    id: string
    name: string
    weight: number
    age: number
    image: string
    typePet: {
      id: string
      name:string
    };
    customer: {
      id: string
      fullName: string
      role: string
    };
  };
  
  export type FilterPetType = {
    Name?: string;
    Weight?: string;
    Age?: string;
    TypePetId?: string;
    CustomerId?: string
    page: number;
    size: number;
  };
  
  export type PetResponse = {
    size: number;
    page: number;
    total: number;
    totalPages: number;
    items: PetType[];
  };