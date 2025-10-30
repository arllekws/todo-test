import { useState } from 'react';
import Header from "../../components/Header";
import Tabs from "../../components/Tabs";
import TodoList from '../../components/TodoList'; // 1. Importe o TodoList
import styles from './style.module.css';
import FinishedTasks from '../../components/FinishedTasks';
import AddTodoForm, { type FormInputs } from '../../components/AddTodoForm';
// import
//     import AddTodoForm from '../../components/AddTodoForm';

// Componentes placeholder para a coluna da direita
// const FinishedTasks = () => <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-sm)', borderRadius: 'var(--border-radius-md)', height: 150 }}><h2>Finished tasks quantity</h2></div>;
// const AddTodoForm = () => <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-sm)', borderRadius: 'var(--border-radius-md)', height: 250 }}><h2>Add new to do</h2></div>;

// 2. Dados de exemplo para as tarefas
interface Task {
  id: number | string;
  title: string;
  description: string;
  date: string;
}

const initialTasks: Task[] = [
  { id: 1, title: 'Mother breakfast', description: 'I need to do my mother breakfast.', date: '17 March 2021 at 08:00 PM' },
  { id: 2, title: 'Learn React', description: 'Study about components and state.', date: '17 March 2021 at 09:00 PM' },
  { id: 3, title: 'Go to the gym', description: 'Leg day!', date: '17 March 2021 at 10:00 PM' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('Todo');
  const [tasks, setTasks] = useState(initialTasks); // 3. Estado para a lista de tarefas

  // Crie a função para ADICIONAR uma tarefa
  const handleAddTask = (data: FormInputs) => {
// Cria a nova tarefa completa
const newTask: Task = {
id: Date.now(), // ID único
title: data.title,
description: data.description ?? '',
date: new Date().toLocaleString() // <-- AQUI ESTÁ A CORREÇÃO!
 };

 // Adiciona a nova tarefa à lista de tarefas
setTasks(currentTasks => [newTask, ...currentTasks]);
 };

  // 4. Função para deletar uma tarefa
  const handleDeleteTask = (id: string | number) => {
    // Filtra a lista, mantendo apenas as tarefas com id diferente do que foi clicado
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
    console.log(`Deletando tarefa com id: ${id}`);
  };

  return (
    <div className="app-container">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className={styles.mainContainer}>
        {/* Coluna da Esquerda */}
        <div className={styles.leftColumn}>
          {activeTab === 'Todo' && (
            // 5. Use o componente TodoList aqui!
            <TodoList tasks={tasks} onDeleteTask={handleDeleteTask} />
          )}
          {activeTab === 'Metrics' && <p style={{ color: 'white' }}>Métricas aparecerão aqui</p>}
        </div>

        {/* Coluna da Direita */}
        <div className={styles.rightColumn}>
          <FinishedTasks quantity={tasks.length} />
          <AddTodoForm onAddTask={handleAddTask} />
        </div>
      </main>
    </div>
  )
}
