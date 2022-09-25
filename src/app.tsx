import { getNavMeta, LOGGED_IN } from './constants/navigation-meta';
import { RoutesGuard } from './helpers';
import { AxiosProvider, useConfiguration } from './hooks';
import { createAxiosInstance } from './services/axios';

function App() {
  const navMeta = getNavMeta(LOGGED_IN);
  const { env } = useConfiguration();
  const axiosInstance = createAxiosInstance({ baseURL: env.appEnv });
  return (
    <AxiosProvider value={axiosInstance}>
      <RoutesGuard root navMeta={navMeta} />
    </AxiosProvider>
  );
}

export default App;
