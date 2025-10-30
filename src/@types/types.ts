export interface FormInputs {
  title: string;
  description: string;
}

export interface AddTodoFormProps {
  onAddTask: (data: FormInputs) => void;
}