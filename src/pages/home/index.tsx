// 1. IMPORTE AS FERRAMENTAS E COMPONENTES NECESSÁRIOS
import { useState, useEffect } from 'react'; 
import Header from "../../components/Header";
import Tabs from "../../components/Tabs";
import styles from './style.module.css';
import type { TaskData as Task } from '../../components/TodoCard';

// Componentes da aba "Todo"
import TodoList from '../../components/TodoList'; 
import FinishedTasks from '../../components/FinishedTasks';
import AddTodoForm from '../../components/AddTodoForm';
import ChuckNorrisPhrase from '../../components/ChuckNorrisPhrase';
import StreakMeter from '../../components/Metrics/StreakMeter';

// Componentes da aba "Metrics"
import CompletionPercent from '../../components/Metrics/CompletionPercent';
import DailyTodosChart, { type DailyData } from '../../components/Metrics/DailyTodosChart';

// O tipo para os dados do formulário
type FormInputs = {
  title: string;
  description?: string;
};


export default function Home() {
  const [activeTab, setActiveTab] = useState('Todo');
  
  // --- LÓGICA DE ESTADO E LOCALSTORAGE (sem alterações) ---
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

  // --- FUNÇÕES DE MANIPULAÇÃO DE TAREFAS (sem alterações) ---
  const handleAddTask = (data: FormInputs) => {
    const newTask: Task = { id: Date.now(), title: data.title, description: data.description ?? '', date: new Date() };
    setTasks(currentTasks => [newTask, ...currentTasks]);
  };

  const handleCompleteTask = (id: string | number) => {
    const taskToComplete = tasks.find(task => task.id === id);
    if (!taskToComplete) return;
    setCompletedTasks(currentCompleted => [taskToComplete, ...currentCompleted]);
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
  };

  // 2. CÁLCULO DOS DADOS PARA OS GRÁFICOS
  const totalTasksCount = tasks.length + completedTasks.length;
  const completionPercentage = totalTasksCount > 0 
    ? Math.round((completedTasks.length / totalTasksCount) * 100) 
    : 0;

  const dailyChartData: DailyData[] = [
    { day: 'M', completed: 4, goal: 10 }, { day: 'T', completed: 8, goal: 10 },
    { day: 'W', completed: 2, goal: 10 }, { day: 'T', completed: 9, goal: 10 },
    { day: 'F', completed: 7, goal: 10 }, { day: 'S', completed: 3, goal: 10 },
    { day: 'Today', completed: 5, goal: 10 },
  ];
  const currentStreak = 3; // Ex: 3 dias de sequência
  const streakGoal = 7;    // Ex: meta de 7 dias

  // 3. RENDERIZAÇÃO (JSX)
  return (
    <div className="app-container">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {/* Layout da aba TODO */}
        {activeTab === 'Todo' && (
          <div className={styles.mainContainer}>
            <div className={styles.leftColumn}>
              <TodoList tasks={tasks} onCompleteTask={handleCompleteTask} />
              <ChuckNorrisPhrase />
            </div>
            <div className={styles.rightColumn}>
              <FinishedTasks quantity={completedTasks.length} />
              <AddTodoForm onAddTask={handleAddTask} />
            </div>
          </div>
        )}

        {/* Layout da aba METRICS */}
        {activeTab === 'Metrics' && (
          <div className={styles.metricsGrid}>
            <div className={styles.dailyChartContainer}>
              <DailyTodosChart data={dailyChartData} />
            </div>
            <div className={styles.percentContainer}>
              <CompletionPercent value={completionPercentage} />
            </div>
            <div className={styles.streakContainer}>
              <StreakMeter streak={currentStreak} goal={streakGoal} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
