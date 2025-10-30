import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './styles.module.css';
import {  type AddTodoFormProps, type FormInputs } from '../../@types/types';

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTask }) => {
  // Desestruturação do hook useForm para obter métodos e estado do formulário
  // register: função para registrar inputs no formulário
  // handleSubmit: função que processa a submissão do formulário
  // reset: função que limpa todos os campos do formulário
  // formState.errors: objeto contendo erros de validação dos campos
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();

  /**
   * Função que processa os dados do formulário quando submetido
   * 
   * @param {FormInputs} data - Dados do formulário (title e description)
   */
  const processSubmit: SubmitHandler<FormInputs> = (data) => {
    // Chama a função callback passada via props com os dados do formulário
    onAddTask(data); 
    
    // Reseta o formulário, limpando todos os campos após a submissão
    reset();  
  };

  return (
    <div className={styles.card}>
      {/* Título do formulário */}
      <h2 className={styles.title}>Add new to do</h2>

      {/* Formulário com handler de submissão do react-hook-form */}
      <form onSubmit={handleSubmit(processSubmit)} className={styles.form}>
        
        {/* Grupo de input para o título da tarefa */}
        <div className={styles.inputGroup}>
          <label htmlFor="title">Task Name:</label>
          <input
            id="title"
            type="text"
            placeholder="O que precisa ser feito?"
            // Registra o campo "title" com validação obrigatória
            {...register("title", { required: "O título é obrigatório." })}
          />
          {/* Exibe mensagem de erro caso o campo title não seja preenchido */}
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        </div>

        {/* Grupo de input para a descrição da tarefa */}
        <div className={styles.inputGroup}>
          <label htmlFor="description">Task Description:</label>
          <input
            id="description"
            type="text"
            placeholder="Algum detalhe extra?"
            // Registra o campo "description" sem validação obrigatória
            {...register("description")} 
          />
        </div>

        {/* Botão de submissão do formulário */}
        <button type="submit" className={styles.submitButton}>
          Create Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
