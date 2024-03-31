import { useState, useEffect } from "react";
import axios from "axios";

const useGetApi = () => {
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("notezilla_token");

    const API = axios.create({
      baseURL: "http://localhost:3000/api/",
    });

    const requestInterceptor = API.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    setApi(API);

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return api;
};

export default useGetApi;
