import { createContext } from 'react';

import { AxiosInstance } from 'axios';

import { createProvider } from '../utils/provider-context';

const { Provider: AxiosProvider, useData: useAxiosInstance } = createProvider<AxiosInstance>(
  'ThemeProvider',
  createContext<AxiosInstance>(null as any)
);

export { AxiosProvider, useAxiosInstance };
