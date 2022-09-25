import { useEffect, useState } from 'react';

import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { useAxiosInstance } from './';

type TUseAxios = {
  // TODO: Add specific values list for url
  url: string;
  config?: AxiosRequestConfig;
};

export const useAxios = ({ url, config }: TUseAxios) => {
  const axiosMethod: 'get' | 'put' | 'post' | 'delete' | 'patch' = 'get';
  const { method, ...restConfig } = { method: axiosMethod, ...config };
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(true);
  const axios: AxiosInstance = useAxiosInstance();
  const fetchData = async () => {
    try {
      const res = await axios.request({ ...restConfig, method, url });
      setResponse(res.data);
      setLoading(false);
    } catch (err: unknown) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { response, error, loading };
};
