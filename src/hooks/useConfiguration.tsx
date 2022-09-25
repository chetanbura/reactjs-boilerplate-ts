import { useEffect, useState } from 'react';

type TEnum = {
  appEnv: string;
};

type TConfig = {
  env: TEnum;
};

const verifyRequiredEnv = (envs: string[]) => {
  envs.forEach((env: string) => {
    if (process.env[env] === undefined) {
      throw new Error(`process.env.${env} not found. Please provide ${env} in env.`);
    }
  });
  return true;
};

export function useConfiguration(): TConfig {
  verifyRequiredEnv(['REACT_APP_ENV']);
  // set defaults required values from process.env
  const defaults = {
    env: {
      appEnv: process.env.REACT_APP_ENV ?? '',
    },
  };
  const [config, setConfig] = useState<TConfig>(defaults);
  useEffect(() => {
    setConfig({
      ...defaults,
      env: {
        ...defaults.env,
        appEnv: process.env.REACT_APP_ENV ?? '',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return config;
}
