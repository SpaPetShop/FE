import axiosClient from "./axiosClient";
import { PetType } from "../types/PetType/PetType";
import { StaffMember } from "../types/User/Staff";
import { OrderType } from "../types/OrderType";

const BookingAPI = {
  // Fetch pet types
  getPetTypes: (params?: any) => {
    const url = "/typePet";
    return axiosClient.get<any, { items: PetType[] }>(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },

  // Fetch staff members
  getStaffList: (params?: any) => {
    const url = "/accounts?Role=STAFF";
    return axiosClient.get<any, { items: StaffMember[] }>(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },

  getBookingsByCustomerId: (customerId: string) => {
    const url = `/orders?AccountId=${customerId}`;
    return axiosClient.get<any, OrderType>(url);
  },

  // Create a new pet
  createPet: (payload: any) => {
    const url = "/pet";
    return axiosClient.post<any, { id: string }>(url, payload);
  },

  // Create a new booking
  createBooking: (payload: any) => {
    const url = "/orders";
    return axiosClient.post(url, payload);
  },
};

export default BookingAPI;