// Hooks do React para gerenciamento de estado e efeitos colaterais
import { useState, useEffect } from 'react'; 

// Componentes principais da interface
import Header from "../../components/Header";
import Tabs from "../../components/Tabs";
import styles from './style.module.css';

// Importação do tipo TaskData (renomeado como Task) para tipagem TypeScript
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

/**
 * Tipo que define a estrutura dos dados do formulário de adição de tarefas
 */
type FormInputs = {
  title: string; // Título da tarefa (obrigatório)
  description?: string; // Descrição da tarefa (opcional)
};

 /**
/**
 * Componente Home
 * 
 * Este é o componente principal da aplicação de gerenciamento de tarefas (To-Do).
 * Gerencia o estado global das tarefas (pendentes e concluídas), persiste dados
 * no localStorage, e renderiza diferentes interfaces baseadas na aba ativa:
 * - Aba "Todo": Lista de tarefas, formulário de adição e estatísticas básicas
 * - Aba "Metrics": Gráficos e métricas de desempenho
 */
export default function Home() {
  // Estado que controla qual aba está ativa ('Todo' ou 'Metrics')
  const [activeTab, setActiveTab] = useState('Todo');

  /**
   * Estado das tarefas pendentes
   * Inicializado com dados do localStorage se disponíveis, caso contrário array vazio
   * A função de inicialização (lazy initialization) é executada apenas na primeira renderização
   */
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('minhasTarefasPendentes');
    if (savedTasks) {
      // Parse do JSON com reviver function para converter strings de data em objetos Date
      return JSON.parse(savedTasks, (key, value) => {
        if (key === 'date') return new Date(value);
        return value;
      });
    }
    return [];
  }); 
  
  /**
   * Estado das tarefas concluídas
   * Inicializado com dados do localStorage se disponíveis, caso contrário array vazio
   */
  const [completedTasks, setCompletedTasks] = useState<Task[]>(() => {
    const savedCompleted = localStorage.getItem('minhasTarefasConcluidas');
    if (savedCompleted) {
      // Parse do JSON com reviver function para converter strings de data em objetos Date
      return JSON.parse(savedCompleted, (key, value) => {
        if (key === 'date') return new Date(value);
        return value;
      });
    }
    return [];
  });

  /**
   * Efeito que persiste as tarefas pendentes no localStorage
   * Executado sempre que o array 'tasks' é modificado
   */
  useEffect(() => {
    localStorage.setItem('minhasTarefasPendentes', JSON.stringify(tasks));
  }, [tasks]);

  /**
   * Efeito que persiste as tarefas concluídas no localStorage
   * Executado sempre que o array 'completedTasks' é modificado
   */
  useEffect(() => {
    localStorage.setItem('minhasTarefasConcluidas', JSON.stringify(completedTasks));
  }, [completedTasks]);


  /**
   * Função que adiciona uma nova tarefa à lista de tarefas pendentes
   * 
   * @param {FormInputs} data - Dados do formulário (title e description)
   */
  const handleAddTask = (data: FormInputs) => {
    // Cria um novo objeto de tarefa com ID único baseado em timestamp
    const newTask: Task = { 
      id: Date.now(), 
      title: data.title, 
      description: data.description ?? '', // Usa operador nullish coalescing para valor padrão
      date: new Date() 
    };
    // Adiciona a nova tarefa no início do array (mais recente primeiro)
    setTasks(currentTasks => [newTask, ...currentTasks]);
  };

  /**
   * Função que marca uma tarefa como concluída
   * Move a tarefa do array de pendentes para o array de concluídas
   * 
   * @param {string | number} id - ID da tarefa a ser completada
   */
  const handleCompleteTask = (id: string | number) => {
    // Busca a tarefa pelo ID no array de tarefas pendentes
    const taskToComplete = tasks.find(task => task.id === id);
    if (!taskToComplete) return; // Se não encontrar, retorna sem fazer nada
    
    // Adiciona a tarefa ao array de concluídas
    setCompletedTasks(currentCompleted => [taskToComplete, ...currentCompleted]);
    
    // Remove a tarefa do array de pendentes
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
  };


  // Calcula o total de tarefas (pendentes + concluídas)
  const totalTasksCount = tasks.length + completedTasks.length;
  
  // Calcula a porcentagem de conclusão
  // Se não houver tarefas, retorna 0 para evitar divisão por zero
  const completionPercentage = totalTasksCount > 0 
    ? Math.round((completedTasks.length / totalTasksCount) * 100) 
    : 0;

  // Dados mockados para o gráfico de tarefas diárias
  // Em uma aplicação real, esses dados viriam de cálculos baseados nas tarefas reais
  const dailyChartData: DailyData[] = [
    { day: 'M', completed: 4, goal: 10 }, 
    { day: 'T', completed: 8, goal: 10 },
    { day: 'W', completed: 2, goal: 10 }, 
    { day: 'T', completed: 9, goal: 10 },
    { day: 'F', completed: 7, goal: 10 }, 
    { day: 'S', completed: 3, goal: 10 },
    { day: 'Today', completed: 5, goal: 10 },
  ];
  
  // Dados mockados para o medidor de sequência (streak)
  const currentStreak = 3; // Exemplo: 3 dias consecutivos completando tarefas
  const streakGoal = 7;    // Exemplo: meta de 7 dias consecutivos


  return (
    <div className="app-container">
      {/* Cabeçalho da aplicação */}
      <Header />
      
      {/* Sistema de abas para alternar entre "Todo" e "Metrics" */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {/* 
          Layout da aba TODO
          Exibido apenas quando activeTab === 'Todo'
          Organizado em duas colunas: esquerda (lista e frases) e direita (estatísticas e formulário)
        */}
        {activeTab === 'Todo' && (
          <div className={styles.mainContainer}>
            {/* Coluna esquerda: Lista de tarefas e frases motivacionais */}
            <div className={styles.leftColumn}>
              <TodoList tasks={tasks} onCompleteTask={handleCompleteTask} />
              <ChuckNorrisPhrase />
            </div>
            
            {/* Coluna direita: Contador de tarefas finalizadas e formulário de adição */}
            <div className={styles.rightColumn}>
              <FinishedTasks quantity={completedTasks.length} />
              <AddTodoForm onAddTask={handleAddTask} />
            </div>
          </div>
        )}

        {/* 
          Layout da aba METRICS
          Exibido apenas quando activeTab === 'Metrics'
          Organizado em grid com três componentes de métricas
        */}
        {activeTab === 'Metrics' && (
          <div className={styles.metricsGrid}>
            {/* Gráfico de tarefas diárias */}
            <div className={styles.dailyChartContainer}>
              <DailyTodosChart data={dailyChartData} />
            </div>
            
            {/* Porcentagem de conclusão geral */}
            <div className={styles.percentContainer}>
              <CompletionPercent value={completionPercentage} />
            </div>
            
            {/* Medidor de sequência (streak) */}
            <div className={styles.streakContainer}>
              <StreakMeter streak={currentStreak} goal={streakGoal} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
