import React from 'react';
import TodoCard, { type TaskData } from '../TodoCard';
import styles from './styles.module.css';

/**
 * Interface que define as propriedades do componente TodoList
 */
interface TodoListProps {
  tasks: TaskData[]; // Array de tarefas a serem exibidas
  onCompleteTask: (id: string | number) => void; // Função callback para completar/deletar uma tarefa
}

/**
 * Componente TodoList
 * 
 * Este componente renderiza uma lista de tarefas (todos) utilizando o componente TodoCard
 * para cada tarefa individual. Recebe um array de tarefas e uma função callback para
 * gerenciar a conclusão/remoção de tarefas, que é propagada para cada card filho.
 * 
 * @param {TodoListProps} props - Propriedades do componente
 * @param {TaskData[]} props.tasks - Array contendo todas as tarefas a serem exibidas
 * @param {Function} props.onCompleteTask - Função callback executada quando uma tarefa é completada/deletada
 */
const TodoList: React.FC<TodoListProps> = ({ tasks, onCompleteTask }) => {

  return (
    <div className={styles.listContainer}>
      {/* Título da lista de tarefas */}
      <h2 className={styles.listTitle}>To do</h2>
      
      {/* Container que envolve todos os cards de tarefas */}
      <div className={styles.cardsWrapper}>
        {/* 
          Mapeia o array de tarefas para renderizar um TodoCard para cada tarefa
          - key={task.id}: Chave única necessária para otimização do React
          - Spread das propriedades da tarefa (id, title, description, date)
          - onComplete: Passa a função callback para o card filho
        */}
        {tasks.map((task) => (
          <TodoCard
            key={task.id} // Chave única para identificação do React
            id={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            // Passa a função 'onCompleteTask' (que veio do componente pai) para a prop 'onComplete' do card
            onComplete={onCompleteTask} 
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
