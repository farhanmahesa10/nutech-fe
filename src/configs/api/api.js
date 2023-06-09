import axios from "axios";

const BaseAPIURL = process.env.REACT_APP_BASE_API_URL;

const API = axios.create({
  baseURL: BaseAPIURL,
});

const HeaderConf = (params) => {
  const config = {
    // headers: {
    //   Authorization: `Bearer ${getCookies("refreshToken", true)?.refreshToken}`,
    //   "Content-Type": "multipart/form-data",
    // },
    params: params && {
      column: params,
    },
  };
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
export { API, GET, POST, PUT, PATCH, DESTROY, HeaderConf, BaseAPIURL };
