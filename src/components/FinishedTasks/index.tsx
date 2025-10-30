import React from 'react';
import styles from './css.module.css';

/**
 * Interface que define as propriedades do componente FinishedTasks
 */
interface FinishedTasksProps {
  quantity: number; // Quantidade de tarefas finalizadas
}

/**
 * Componente FinishedTasks
 * 
 * Este componente exibe a quantidade de tarefas finalizadas em um card estilizado.
 * O número é formatado para sempre exibir pelo menos dois dígitos (ex: 01, 02, 15).
 * 
 * @param {FinishedTasksProps} props - Propriedades do componente
 * @param {number} props.quantity - Número de tarefas finalizadas a ser exibido
 */
const FinishedTasks: React.FC<FinishedTasksProps> = ({ quantity }) => {
  return (
    <div className={styles.card}>
      {/* Título do card indicando o propósito do componente */}
      <h2 className={styles.title}>Finished tasks quantity</h2>
      
      {/* 
        Exibe a quantidade de tarefas finalizadas formatada
        - String(quantity): converte o número para string
        - padStart(2, '0'): adiciona zeros à esquerda para garantir pelo menos 2 dígitos
        Exemplos: 1 → "01", 5 → "05", 15 → "15", 100 → "100"
      */}
      <span className={styles.quantity}>{String(quantity).padStart(2, '0')}</span>
    </div>
  );
};

export default FinishedTasks;
