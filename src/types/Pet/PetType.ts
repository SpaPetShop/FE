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