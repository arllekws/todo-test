import React from 'react';
import styles from './styles.module.css';

// Definimos os tipos para as propriedades que o componente vai receber
interface TabsProps {
  activeTab: string; // A aba que está ativa no momento
  setActiveTab: (tab: string) => void; // Função para mudar a aba ativa
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabsContainer}>
      <button
        // Aplica a classe 'active' se a aba ativa for 'Todo'
        className={`${styles.tabButton} ${activeTab === 'Todo' ? styles.active : ''}`}
        onClick={() => setActiveTab('Todo')}
      >
        Todo
      </button>
      <button
        // Aplica a classe 'active' se a aba ativa for 'Metrics'
        className={`${styles.tabButton} ${activeTab === 'Metrics' ? styles.active : ''}`}
        onClick={() => setActiveTab('Metrics')}
      >
        Metrics
      </button>
    </div>
  );
};

export default Tabs;
