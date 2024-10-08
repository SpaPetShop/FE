export type ComboType = {
  id: string;
  name: string;
  stockPrice: number;
  sellingPrice: number;
  description: string;
  status: string;
  priority: string | null;
  timeWork: number;
  image: { imageURL: string }[];
  category: {
    id: string;
    name: string;
  };
  supProducts: {
    id: string;
    name: string;
    stockPrice: number;
    sellingPrice: number;
  }[];
};

export type FilterComboType = {
  Name?: string;
  Status?: string;
  UnitPrice?: number;
  CategoryId?: string;
  page: number;
  size: number;
};

export type ComboResponse = {
  size: number;
  page: number;
  total: number;
  totalPages: number;
  items: ComboType[];
};
