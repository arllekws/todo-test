import React from 'react';
import TodoCard, { type TaskData } from '../TodoCard';
import styles from './styles.module.css';

interface TodoListProps {
  tasks: TaskData[];
  onCompleteTask: (id: string | number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onCompleteTask }) => {

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listTitle}>To do</h2>
      <div className={styles.cardsWrapper}>
        {tasks.map((task) => (
          <TodoCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            // Passa a função 'onCompleteTask' (que veio da Home) para a prop 'onComplete' do card
            onComplete={onCompleteTask} 
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
