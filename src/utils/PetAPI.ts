import axiosClient from "./axiosClient";
const petAPI = {
  getDataBookingOfCustomer: (params: any) => {
    const url = "/";
    return axiosClient.get(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
  createNewPet: (payload: any) => {
    const url = "/";
    return axiosClient.post(url, payload);
  },
  updatePet: (payload: any) => {
    const url = "/";
    return axiosClient.put(url, payload);
  },
  deletePet: (payload: any) => {
    const url = "/";
    return axiosClient.delete(url, payload);
  },
};
export default petAPI;
