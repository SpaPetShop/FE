export type TaskType = {
  id: string;
  type: string;
  createDate: string;
  excutionDate: string;
  status: string;
  completedDate: string;
  order: {
    id: string;
    invoiceCode: string;
    finalAmount: number;
  };
  staff: {
    id: string;
    fullName: string;
    role: string;
  };
  pets: {
    id: string;
    name: string;
    image: string;
    typePet: {
      id: string;
      name: string;
    };
  };
};

export type FilterTaskType = {
  AccountId?: string;
  Status?: string;
  Type?: string;
  ExcutionDate?: string;
  OrderId?: string
  page: number;
  size: number;
};

export type TaskResponse = {
  size: number;
  page: number;
  total: number;
  totalPages: number;
  items: TaskType[];
};
