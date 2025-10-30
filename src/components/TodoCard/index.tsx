import React from 'react';
import styles from './styles.module.css';
import deleteIconUrl from '../../assets/deleteicon.svg';
// Importação nomeada da função format da biblioteca date-fns para formatação de datas
import { format } from 'date-fns';
// Importação da localização em inglês americano para formatação de datas
import { enUS } from 'date-fns/locale';

/**
 * Interface que define a estrutura dos dados de uma tarefa
 */
export interface TaskData {
  id: string | number; // Identificador único da tarefa (pode ser string ou número)
  title: string; // Título da tarefa
  description: string; // Descrição detalhada da tarefa
  date: Date; // Data de criação ou prazo da tarefa (objeto Date)
}

/**
 * Interface que define as propriedades do componente TodoCard
 * Estende TaskData e adiciona a função de callback onComplete
 */
export interface TodoCardProps extends TaskData {
  onComplete: (id: string | number) => void; // Função callback executada ao completar/deletar a tarefa
}

/**
 * Componente TodoCard
 * 
 * Este componente renderiza um card individual de tarefa (todo) exibindo
 * título, descrição, data formatada e um botão para completar/deletar a tarefa.
 * Utiliza a biblioteca date-fns para formatação consistente de datas.
 * 
 * @param {TodoCardProps} props - Propriedades do componente
 * @param {string | number} props.id - ID único da tarefa
 * @param {string} props.title - Título da tarefa
 * @param {string} props.description - Descrição da tarefa
 * @param {Date} props.date - Data da tarefa
 * @param {Function} props.onComplete - Função callback para completar/deletar a tarefa
 */
const TodoCard: React.FC<TodoCardProps> = ({ id, title, description, date, onComplete }) => {
  // Formata a data usando date-fns com validação
  // Verifica se 'date' é uma instância válida de Date antes de formatar
  // Formato: "dd MMMM yyyy 'at' hh:mm a" → Exemplo: "30 October 2025 at 03:45 PM"
  const formattedDate = date instanceof Date 
    ? format(date, "dd MMMM yyyy 'at' hh:mm a", { locale: enUS })
    : 'Invalid date'; // Mensagem de fallback caso a data seja inválida

  return (
    <div className={styles.cardContainer}>
      {/* Seção de conteúdo principal do card */}
      <div className={styles.content}>
        {/* Título da tarefa */}
        <h3 className={styles.title}>{title}</h3>
        
        {/* Descrição da tarefa */}
        <p className={styles.description}>{description}</p>
      </div>
      
      {/* Seção de metadados e ações do card */}
      <div className={styles.meta}>
        {/* Exibe a data formatada */}
        <span className={styles.date}>{formattedDate}</span>
        
        {/* 
          Botão para completar/deletar a tarefa
          Ao clicar, executa a função onComplete passando o ID da tarefa
        */}
        <button className={styles.deleteButton} onClick={() => onComplete(id)}>
          {/* Ícone visual do botão de deletar */}
          <img src={deleteIconUrl} alt="Complete Task" className={styles.deleteIconImage} />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
