import styles from './404.module.css';

export function PageNotFound() {
  return (
    <div className={styles.main}>
      <header>
        <h1>Page not found (404)</h1>
      </header>
    </div>
  );
}
