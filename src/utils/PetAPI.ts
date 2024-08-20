import { TPetResponse } from "../types/Pet/PetType";
import axiosClient from "./axiosClient";
const petAPI = {
  getAllPetType: (params: any) => {
    const url = "/typePet";
    return axiosClient.get<any, TPetResponse>(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
  createNewTypePet: (payload: any) => {
    const url = "/typePet";
    return axiosClient.post(url, payload);
  },
  updateTypePet: (id: string, payload: any) => {
    const url = `/typePet/${id}`;
    return axiosClient.put(url, payload);
  },
  deleteTypePet: (payload: any) => {
    const url = "/typePet";
    return axiosClient.delete(url, payload);
  },
};
export default petAPI;
