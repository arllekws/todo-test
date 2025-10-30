import React from 'react';
import styles from './styles.module.css';

/**
 * Interface que define as propriedades do componente Tabs
 */
interface TabsProps {
  activeTab: string; // A aba que está ativa no momento
  setActiveTab: (tab: string) => void; // Função para mudar a aba ativa
}

/**
 * Componente Tabs
 * 
 * Este componente renderiza um sistema de abas (tabs) para navegação entre
 * diferentes seções da aplicação: "Todo" (lista de tarefas) e "Metrics" (métricas).
 * A aba ativa recebe estilização especial para indicar visualmente qual seção está sendo exibida.
 * 
 * @param {TabsProps} props - Propriedades do componente
 * @param {string} props.activeTab - Nome da aba atualmente ativa
 * @param {Function} props.setActiveTab - Função callback para alterar a aba ativa
 */
const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabsContainer}>
      {/* 
        Botão da aba "Todo"
        Aplica condicionalmente a classe 'active' quando esta aba está selecionada
      */}
      <button
        // Aplica a classe 'active' se a aba ativa for 'Todo'
        className={`${styles.tabButton} ${activeTab === 'Todo' ? styles.active : ''}`}
        // Ao clicar, atualiza o estado para tornar esta aba ativa
        onClick={() => setActiveTab('Todo')}
      >
        Todo
      </button>
      
      {/* 
        Botão da aba "Metrics"
        Aplica condicionalmente a classe 'active' quando esta aba está selecionada
      */}
      <button
        // Aplica a classe 'active' se a aba ativa for 'Metrics'
        className={`${styles.tabButton} ${activeTab === 'Metrics' ? styles.active : ''}`}
        // Ao clicar, atualiza o estado para tornar esta aba ativa
        onClick={() => setActiveTab('Metrics')}
      >
        Metrics
      </button>
    </div>
  );
};

export default Tabs;
