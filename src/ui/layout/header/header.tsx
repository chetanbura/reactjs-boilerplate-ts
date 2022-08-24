import { NavLink } from 'react-router-dom';

import { getNavMeta, LOGGED_IN } from '../../../constants/navigation-meta';

import styles from './header.module.css';

export interface IActiveToggle {
  isActive?: boolean;
}

export const Header = () => {
  const navMeta = getNavMeta(LOGGED_IN);
  const activeToggle = ({ isActive }: IActiveToggle) => ({
    ...(isActive ? { textDecoration: 'underline', color: 'red' } : null),
  });
  return (
    <div className={styles.main}>
      {'  '}
      <NavLink style={activeToggle} to="/">
        Home
      </NavLink>
      {navMeta.map((nav) => (
        <>
          {'  '}
          <NavLink style={activeToggle} to={nav.path}>
            {nav.title}
          </NavLink>
        </>
      ))}
    </div>
  );
};
