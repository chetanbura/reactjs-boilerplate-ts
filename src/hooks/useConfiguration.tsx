import { useEffect, useState } from 'react';

export function useConfiguration() {
  const [config, setConfig] = useState({});

  useEffect(() => {
    setConfig({
      env: {
        appEnv: process.env.REACT_APP_ENV,
      },
    });
  }, []);

  return [config];
}
