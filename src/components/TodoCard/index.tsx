import React from 'react';
import styles from './styles.module.css';
import deleteIconUrl from '../../assets/deleteicon.svg';

export interface TaskData {
  id: string | number;
  title: string;
  description: string;
  date: string;
}

export interface TodoCardProps extends TaskData {
  onDelete: (id: string | number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ id, title, description, date, onDelete }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.meta}>
        <span className={styles.date}>{date}</span>
        <button className={styles.deleteButton} onClick={() => onDelete(id)}>
          <img src={deleteIconUrl} alt="Delete Task" className={styles.deleteIconImage} />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
