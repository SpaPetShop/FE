import { CategoryResponse } from "../types/Category/CategoryType";
import axiosClient from "./axiosClient";
const CategoryAPI = {
  getAll: (params: any) => {
    const url = "/";
    return axiosClient.get<any, CategoryResponse>(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
  create: (payload: any) => {
    const url = "/";
    return axiosClient.post(url, payload);
  },
  update: (id: string, payload: any) => {
    const url = `/`;
    return axiosClient.put(url, payload);
  },
  delete: (id: string) => {
    const url = "/";
    return axiosClient.delete(url);
  },
};
export default CategoryAPI;
