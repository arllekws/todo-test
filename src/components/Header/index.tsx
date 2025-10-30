import React from 'react';
import styles from './styles.module.css';

/**
 * Componente Header
 * 
 * Este componente renderiza o cabeçalho da aplicação de tarefas (To-Do).
 * Exibe o título "Today" com estilização especial na palavra "day" e um subtítulo
 * motivacional incentivando o usuário a realizar suas tarefas hoje.
 */
const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      {/* 
        Título principal da aplicação
        A palavra "day" é envolvida em um span para aplicar estilização diferenciada
      */}
      <h1 className={styles.title}>
        To<span className={styles.day}>day</span>
      </h1>
      
      {/* 
        Subtítulo com mensagem motivacional
        A palavra "do" é destacada com um span para ênfase visual
      */}
      <p className={styles.subtitle}>
        Wake up, go ahead, do the thing not tomorrow, <span className={styles.do}>do</span> today.
      </p>
    </header>
  );
};

export default Header;
