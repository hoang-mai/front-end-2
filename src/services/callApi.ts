import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.includes("login")) {
      return config;
    }
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = (url: string, params?: any) => {
  return axiosInstance.get(url, { params });
}
export const post = (url: string, data?: any) => {
  return axiosInstance.post(url, data);
}
export const put = (url: string, data?: any) => {
  return axiosInstance.put(url, data);
}
export const del = (url: string) => {
  return axiosInstance.delete(url);
}