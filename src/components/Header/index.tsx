import React from 'react';
import styles from './styles.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.title}>
      To<span className={styles.day}>day</span>
    </h1>
      <p className={styles.subtitle}>
        Wake up, go ahead, do the thing not tomorrow, <span className={styles.do}>do</span> today.
      </p>
    </header>
  );
};

export default Header;
