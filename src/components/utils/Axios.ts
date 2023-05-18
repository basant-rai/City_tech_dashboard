import axios from "axios";
import { AppConfig } from "../config/App.config";
import { store } from "../redux/store"
import jsCookie from "js-cookie";


const axiosInstance = axios.create({
  baseURL: AppConfig.api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding Auhorization header to every request if token is available
axiosInstance.interceptors.request.use((config) => {
  // const token = store.getState().auth;

  const accessToken = jsCookie.get('city_token');


  //
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

//
export default axiosInstance;