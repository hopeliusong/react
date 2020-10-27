import axios from "axios";
const request = axios.create({
  baseURL: "/",
});

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (response) => {
    if (response.data.code === 2000) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    //返回错误的地方
  }
);

export default request;
