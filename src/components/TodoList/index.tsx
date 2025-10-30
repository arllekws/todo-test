import React from 'react';
import TodoCard, { type TaskData } from '../TodoCard'; // Importa o TodoCard e seus tipos
import styles from './styles.module.css';

// O componente TodoList recebe uma lista de tarefas e a função de deletar
interface TodoListProps {
  tasks: TaskData[]; // <<-- MUDANÇA AQUI! Agora esperamos apenas os dados.
  onDeleteTask: (id: string | number) => void;
}
const TodoList: React.FC<TodoListProps> = ({ tasks, onDeleteTask }) => {
  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listTitle}>To do</h2>
      <div className={styles.cardsWrapper}>
        {tasks.map((task) => (
          <TodoCard
            key={task.id} // A key é essencial para o React em listas
            id={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            onDelete={onDeleteTask} // Passa a função de deletar para o card
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
