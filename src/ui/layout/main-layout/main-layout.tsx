import { Outlet } from 'react-router-dom';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import styles from './main-layout.module.css';

export const MainLayout = () => (
  <div>
    <main>
      <Header />
      <section className={styles.main}>
        <Outlet />
      </section>
    </main>
    <Footer />
  </div>
);
