import axios from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: "http://baseURL",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      toast.warning("Access token expires !");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
