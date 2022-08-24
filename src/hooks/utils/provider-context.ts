import React, {
  Context,
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';

export const buildContextHook =
  <T>(contextProvider: Context<T>, contextTitle: string) =>
  () => {
    const context = useContext<T>(contextProvider);
    if (!context) {
      throw new Error(`context must be used within a ${contextTitle}`);
    }
    return context;
  };

export const createProvider = <TValue>(
  displayName: string,
  context = createContext<TValue>(null as any)
) => {
  const Provider: FunctionComponent<{ value: TValue; children: React.ReactNode }> = ({
    children,
    value: pValue,
  }) => {
    const [value, setValue] = useState<TValue>(pValue);
    useEffect(() => {
      setValue(value);
    }, [pValue, value]);
    return React.createElement(context.Provider, { value }, children);
  };
  Provider.displayName = displayName;
  (Provider as any).context = context;
  const useData = buildContextHook<TValue>(context, displayName);
  return { Provider, useData };
};
