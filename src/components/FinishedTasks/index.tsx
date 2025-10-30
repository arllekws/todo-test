import React from 'react';
import styles from './css.module.css';

interface FinishedTasksProps {
  quantity: number;
}

const FinishedTasks: React.FC<FinishedTasksProps> = ({ quantity }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Finished tasks quantity</h2>
      <span className={styles.quantity}>{String(quantity).padStart(2, '0')}</span>
    </div>
  );
};

export default FinishedTasks;
