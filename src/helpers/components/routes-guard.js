import { Route, Routes } from 'react-router-dom';

import { Home, PageNotFound } from '../../pages';
import { MainLayout } from '../../ui/layout';
import { lazyRetry } from '../../utilities/lazy-load';
import { SuspenseBoundary } from './suspense-boundary';

const loadComponent = (component) => lazyRetry(() => import(`../../pages/${component}`));

export function RoutesGuard({ root = false, navMeta, withLayout = true, path = '/' }) {
  return (
    <Routes>
      <Route path={path} element={withLayout ? <MainLayout /> : undefined}>
        {/* Default Home page route component mounted */}
        {root && <Route index element={<Home />} />}
        {navMeta.map((nav) => {
          const Component = loadComponent(nav.component);
          const hasSubNav = nav.subNav && nav.subNav.length;
          return (
            <Route
              key={nav.path}
              index={nav.index}
              path={nav.path}
              element={
                <SuspenseBoundary>
                  <Component />
                </SuspenseBoundary>
              }
            >
              {hasSubNav &&
                nav.subNav.map((subNav) => {
                  const SubComponent = loadComponent(
                    `${nav.component}/sub-pages/${subNav.component}`
                  );
                  return (
                    <Route
                      key={subNav.path}
                      index={subNav.index}
                      path={subNav.path}
                      element={
                        <SuspenseBoundary>
                          <SubComponent />
                        </SuspenseBoundary>
                      }
                    />
                  );
                })}
            </Route>
          );
        })}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
