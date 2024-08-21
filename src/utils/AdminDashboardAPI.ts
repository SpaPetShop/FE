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
    const url = `dashboard/countOrderInYeay${params}`;
    return axiosClient.get<any>(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },


};
export default AdminDashboardAPI;
