import axios from "axios";
import React from "react";

const useGetApi = () => {
  const API = axios.create({
    baseURL: "http://localhost:3000/api/",
  });

  const useApi = () => {
    const token = localStorage.getItem("notezilla_token");

    API.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return;
      }
    );
    return API;
  };
  return { useApi };
};

export default useGetApi;
