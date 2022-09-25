import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import debug from 'debug';

const log = debug('data:api-axios');

interface IAxiosInstance {
  baseURL: string;
  headers?: AxiosRequestHeaders;
}

export const createAxiosInstance = ({ baseURL }: IAxiosInstance): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL,
    // customize the headers etc.
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      log(`Request for: ${config.url}`, config.params);
      return config;
    },
    function (error) {
      log(`Error while request for:`, error);
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      log(`Response for request: ${response.request}`, response.data);
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      log(`Error while response for:`, error);
      return Promise.reject(error);
    }
  );
  return instance;
};
