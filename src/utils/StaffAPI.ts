import axiosClient from "./axiosClient";
const StaffAPI = {
  getAll: (params: any) => {
    const url = "/task";
    return axiosClient.get<any >(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
  getOrderDetail: ( id : string ) => {
    const url = `/orders/${id}`;
    return axiosClient.get<any >(url, {
      
     
    });
  },
  getDetail: (id: string,params: any) => {
    const url = `/task/${id}`;
    return axiosClient.get<any >(url, {
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
    const url = `/orders/${id}`;
    return axiosClient.put(url, payload);
  },

  updateTask: (id: string, payload: any) => {
    const url = `/task/${id}`;
    return axiosClient.put(url, payload);
  },

  delete: (id: string) => {
    const url = `/${id}`;
    return axiosClient.delete(url);
  },
};
export default StaffAPI;