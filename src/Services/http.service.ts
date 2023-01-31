import { axiosInstance } from "./axios";

class HTTP {

  getConfig = () => ({
    headers: {
      "Content-Type": "application/json",
      "authorization": "",
      "withCredentials": true
    }
  })

  getData = async (url: string) => {
    try {
      const { data } = await axiosInstance.get(`${url}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  postData = async (url: string, formData: Record<string, string>) => {
    try {
      const { data } = await axiosInstance.post(
        `${url}`,
        formData
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  updateData = async (url: string, formData: Record<string, string>) => {
    try {
      const { data } = await axiosInstance.put(
        `${url}`,
        formData,
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  deleteData = async (id: string, url: string) => {
    try {
      const { data } = await axiosInstance.delete(`${url}`);
      return data;
    } catch (error) {
      throw error;
    }
  };
}

export const http = new HTTP();
