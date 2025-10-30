"use client";

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './styles.module.css';

export interface FormInputs {
  title: string;
  description: string;
}

interface AddTodoFormProps {
  onAddTask: (data: FormInputs) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTask }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();

  const processSubmit: SubmitHandler<FormInputs> = (data) => {
    onAddTask(data); 
    reset();  
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Add new to do</h2>

      <form onSubmit={handleSubmit(processSubmit)} className={styles.form}>
        
        <div className={styles.inputGroup}>
          <label htmlFor="title">Task Name:</label>
          <input
            id="title"
            type="text"
            placeholder="O que precisa ser feito?"
            {...register("title", { required: "O título é obrigatório." })}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description">Task Description:</label>
          <input
            id="description"
            type="text"
            placeholder="Algum detalhe extra?"
            {...register("description")} 
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
