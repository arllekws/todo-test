import React from 'react';
import styles from './styles.module.css';
import deleteIconUrl from '../../assets/deleteicon.svg';
// MUDANÇA AQUI: Use chaves para importações nomeadas
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

// Define a "forma" correta dos dados da tarefa
export interface TaskData {
  id: string | number;
  title: string;
  description: string;
  date: Date; // A data é um objeto Date
}

// Define as props que o componente do card recebe
export interface TodoCardProps extends TaskData {
  onComplete: (id: string | number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ id, title, description, date, onComplete }) => {
  // Formate a data usando a 'date-fns' para ter controle total
  const formattedDate = date instanceof Date 
    ? format(date, "dd MMMM yyyy 'at' hh:mm a", { locale: enUS })
    : 'Invalid date';

  return (
    <div className={styles.cardContainer}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.meta}>
        <span className={styles.date}>{formattedDate}</span>
        <button className={styles.deleteButton} onClick={() => onComplete(id)}>
          <img src={deleteIconUrl} alt="Complete Task" className={styles.deleteIconImage} />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
