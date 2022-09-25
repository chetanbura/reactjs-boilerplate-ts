import React from 'react';

import { NavLink } from 'react-router-dom';

import { getNavMeta, LOGGED_IN } from '../../../constants/navigation-meta';

import styles from './header.module.scss';

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
        <React.Fragment key={nav.path}>
          {'  '}
          <NavLink style={activeToggle} to={nav.path}>
            {nav.title}
          </NavLink>
        </React.Fragment>
      ))}
    </div>
  );
};
