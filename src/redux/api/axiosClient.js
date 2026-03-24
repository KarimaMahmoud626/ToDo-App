import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.0.105:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  console.log("Request:", config.method, config.url);
  console.log("Params:", JSON.stringify(config.params));
  console.log("Body:", JSON.stringify(config.data));
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Response Error Status:", error.response?.status);
    console.log("Response Error Data:", JSON.stringify(error.response?.data));
    return Promise.reject(error);
  },
);

export default axiosClient;
