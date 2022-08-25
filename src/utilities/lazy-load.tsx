import { lazy } from 'react';

const retry = (fn: any, retriesLeft = 5, interval = 1000) =>
  new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error: any) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error); // reject('maximum retries exceeded');
            return;
          }
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });

export const lazyRetry: any = (operation: any) => lazy((): any => retry(() => operation()));
