import Axios, { AxiosRequestConfig } from 'axios';

export const fetcher = async (config) => {
    const { url, method, data, headers } = config;
    return await Axios.request({
      baseURL:"https://shreebageshwardhamseva.com/admin/api/",
      url,
      method: method ?? 'GET',
      data,
      ...config,
      headers: {

        ...config?.headers,
        ...headers,
      },
    });
  };