import { getNavMeta, LOGGED_IN } from './constants/navigation-meta';
import { RoutesGuard } from './helpers';

function App() {
  const navMeta = getNavMeta(LOGGED_IN);
  return <RoutesGuard root navMeta={navMeta} />;
}

export default App;
