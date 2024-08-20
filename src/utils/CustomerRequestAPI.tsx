
import { CustomerRequestResponse } from "../types/CustomerRequest/CustomerRequestType";
import axiosClient from "./axiosClient";
const CustomerRequestAPI = {
  getAll: (params: any) => {
    const url = "/request";
    return axiosClient.get<any, CustomerRequestResponse>(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
  create: (payload: any) => {
    const url = "/request";
    return axiosClient.post(url, payload);
  },
  update: (id: string, payload: any) => {
    const url = `/request/${id}`;
    return axiosClient.put(url, payload);
  },
  delete: (id: string) => {
    const url = `/request/${id}`;
    return axiosClient.delete(url);
  },
};
export default CustomerRequestAPI;
