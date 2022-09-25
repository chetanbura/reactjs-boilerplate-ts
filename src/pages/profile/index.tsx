import { Link, Outlet, useLocation } from 'react-router-dom';

import styles from './profile.module.scss';

export function Profile() {
  const location = useLocation();
  return (
    <div className={styles.main}>
      <header>
        <h1>Welcome to Profile Page</h1>
      </header>
      {location.pathname !== '/profile/update-email' && (
        <p>
          Clik here to <Link to="update-email">Update Email</Link>
        </p>
      )}
      <Outlet />
    </div>
  );
}

export default Profile;
