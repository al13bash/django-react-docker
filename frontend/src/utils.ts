import { Todo } from "./pages/TodoList/types";

export const generateNextId = (todos: Todo[] | undefined): number => {
  if (!todos || todos.length === 0) return 0;

  return todos[todos.length - 1].id + 1;
};
