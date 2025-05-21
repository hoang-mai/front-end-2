import axios from "axios";
import { refresh } from "./api";
import { useExpired } from "@/stores/expired";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
type FailedQueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
};
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: any, token: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }
      isRefreshing = true;
      const refreshToken = localStorage.getItem('refreshToken')
      return axios.post(import.meta.env.VITE_API_HOST+'/'+refresh, {
        refreshToken: refreshToken,
      })
        .then((res) => {
          const newAccessToken = res.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          processQueue(null, newAccessToken);

          originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
          return axiosInstance(originalRequest);
        })
        .catch((refreshError) => {
          processQueue(refreshError, null);
          const expiredStore = useExpired();
          expiredStore.setExpired(true);
          return Promise.reject(refreshError);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }
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