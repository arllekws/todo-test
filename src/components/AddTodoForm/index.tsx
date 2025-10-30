// Arquivo: AddTodoForm/index.tsx

"use client";

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './styles.module.css';

// 1. Define a "forma" dos dados do nosso formulário
export interface FormInputs {
  title: string;
  description: string;
}

// 2. Define as "props" que o nosso componente vai receber do componente Pai (Home)
interface AddTodoFormProps {
  onAddTask: (data: FormInputs) => void;
}

// 3. O componente em si
const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTask }) => {
  // Inicializa o react-hook-form
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();

  // Esta função é chamada QUANDO o formulário é válido e submetido
  const processSubmit: SubmitHandler<FormInputs> = (data) => {
    onAddTask(data); // Chama a função que veio do Pai (Home) com os dados
    reset();        // Limpa o formulário
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Add new to do</h2>

      {/* O onSubmit do form chama a função do react-hook-form */}
      <form onSubmit={handleSubmit(processSubmit)} className={styles.form}>
        
        <div className={styles.inputGroup}>
          <label htmlFor="title">Task Name:</label>
          <input
            id="title"
            type="text"
            placeholder="O que precisa ser feito?"
            {...register("title", { required: "O título é obrigatório." })}
          />
          {/* Mostra o erro se o campo 'title' estiver vazio */}
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description">Task Description:</label>
          <input
            id="description"
            type="text"
            placeholder="Algum detalhe extra?"
            {...register("description")} // Campo opcional, sem validação
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Create Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
