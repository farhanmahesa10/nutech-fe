import axios from "axios";

import { deleteCookie, getCookies, setCookie } from "cookies-next";
const BaseAPIURL = process.env.REACT_APP_BASE_API_URL;
const API = axios.create({
  baseURL: BaseAPIURL,
});

const HeaderConf = (params) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(config);
  return config;
};

const GET = (url, req, config) => API.get(url, req, config).then((res) => res);

const POST = (url, data, config) =>
  API.post(url, data, config).then((res) => res);

const PUT = (url, data, config) =>
  API.put(url, data, config).then((res) => res);

const PATCH = (url, data, config) =>
  API.patch(url, data, config).then((res) => res);

const DESTROY = (url, data, config) =>
  API.delete(url, data, config).then((res) => res);

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["Authorization"] = `Bearer ${token}`; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
API.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    const refreshToken = localStorage.getItem("refreshToken");

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const result = await API.post("/refresh-token", { refreshToken });
          localStorage.setItem("token", result.data.token);
          originalConfig.headers = {
            ...originalConfig.headers,
            Authorization: `Bearer ${result.data.token}`,
          };
          return API(originalConfig);
        } catch (_error) {
          window.location.href = "/login";
        }
      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);
export { API, GET, POST, PUT, PATCH, DESTROY, HeaderConf, BaseAPIURL };
