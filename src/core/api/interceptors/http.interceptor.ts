import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const Http = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
