export type CustomerRequestType = {
  id: string
  note: string
  status: string
  createDate: string
  exctionDate: string;
  staffId: string;
  orderId: string
  userId: {
    id: string
    fullName: string
    role: string
  };
};

export type FilterCustomerRequestType = {
  AccountId?: string;
  Status?: string;
  Type?: string;
  ExcutionDate?: string;
  OrderId?: string;
  page: number;
  size: number;
};

export type CustomerRequestResponse = {
  size: number;
  page: number;
  total: number;
  totalPages: number;
  items: CustomerRequestType[];
};
