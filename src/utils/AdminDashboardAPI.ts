import axiosClient from "./axiosClient";
const AdminDashboardAPI = {
  getAllCountAcount: () => {
    const url = "/dashboard/countAccount";
    return axiosClient.get<any>(url);
  },
  getAllCountOder: () => {
    const url = "/dashboard/countOrder";
    return axiosClient.get<any>(url);
  },
  getAllCountOderInDay: (params: any) => {
    const url = `/dashboard/countOrderInMonth`;
    return axiosClient.get<any>(url, {
      params,
      paramsSerializer: {
        indexes: null, 
      },
    });
  },


};
export default AdminDashboardAPI;
