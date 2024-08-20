import { TaskType } from "../types/Task/TaskType";
import axiosClient from "./axiosClient";
const TaskAPI = {
  getAll: (params: any) => {
    const url = "/task";
    return axiosClient.get<any, TaskType[]>(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
  create: (payload: any) => {
    const url = "/task";
    return axiosClient.post(url, payload);
  },
  update: (id: string, payload: any) => {
    const url = `/task/${id}`;
    return axiosClient.put(url, payload);
  },
  delete: (id: string) => {
    const url = `/task/${id}`;
    return axiosClient.delete(url);
  },
};
export default TaskAPI;
