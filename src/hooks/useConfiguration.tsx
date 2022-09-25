import { useEffect, useState } from 'react';

type TEnum = {
  appEnv: string;
};

type TConfig = {
  env: TEnum;
};

export function useConfiguration(): TConfig {
  const [config, setConfig] = useState<TConfig>(null as any);

  useEffect(() => {
    setConfig({
      env: {
        appEnv: process.env.REACT_APP_ENV ?? '',
      },
    });
  }, []);

  return config;
}
