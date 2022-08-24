import styles from './home.module.css';

export function Home() {
  return (
    <div className={styles.main}>
      <header>
        <h1>Welcome to ReactJS boilerplate</h1>
        <p>
          <b>Author: Chetan Bura</b>
        </p>
      </header>
    </div>
  );
}

export default Home;
