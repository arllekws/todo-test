import { useState, useEffect } from 'react'; 
import Header from "../../components/Header";
import Tabs from "../../components/Tabs";
import TodoList from '../../components/TodoList'; 
import styles from './style.module.css';
import FinishedTasks from '../../components/FinishedTasks';
import AddTodoForm, { type FormInputs } from '../../components/AddTodoForm';
import ChuckNorrisPhrase from '../../components/ChuckNorrisPhrase';
import type { TaskData as Task } from '../../components/TodoCard';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Todo');
  
  // Lógica do localStorage (sem alterações)
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('minhasTarefasPendentes');
    if (savedTasks) {
      return JSON.parse(savedTasks, (key, value) => {
        if (key === 'date') return new Date(value);
        return value;
      });
    }
    return [];
  }); 
  
  const [completedTasks, setCompletedTasks] = useState<Task[]>(() => {
    const savedCompleted = localStorage.getItem('minhasTarefasConcluidas');
    if (savedCompleted) {
      return JSON.parse(savedCompleted, (key, value) => {
        if (key === 'date') return new Date(value);
        return value;
      });
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('minhasTarefasPendentes', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('minhasTarefasConcluidas', JSON.stringify(completedTasks));
  }, [completedTasks]);

  // Funções de manipulação de tarefas (sem alterações)
  const handleAddTask = (data: FormInputs) => {
    const newTask: Task = {
      id: Date.now(),
      title: data.title,
      description: data.description ?? '',
      date: new Date()
    };
    setTasks(currentTasks => [newTask, ...currentTasks]);
  };

  const handleCompleteTask = (id: string | number) => {
    const taskToComplete = tasks.find(task => task.id === id);
    if (!taskToComplete) return;
    setCompletedTasks(currentCompleted => [taskToComplete, ...currentCompleted]);
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
  };

  return (
    <div className="app-container">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className={styles.mainContainer}>
        <div className={styles.leftColumn}>
          {activeTab === 'Todo' && (
            <TodoList tasks={tasks} onCompleteTask={handleCompleteTask} />
          )}
          {/* MUDANÇA: Revertido para o placeholder original, como você pediu */}
          {activeTab === 'Metrics' && <p style={{ color: 'white' }}>Métricas aparecerão aqui</p>}
        </div>

        {activeTab === 'Todo' && (
          <div className={styles.rightColumn}>
            <FinishedTasks quantity={completedTasks.length} />
            <AddTodoForm onAddTask={handleAddTask} />
          </div>
        )}
      </main>

      {activeTab === 'Todo' && <ChuckNorrisPhrase />}
    </div>
  );
}
