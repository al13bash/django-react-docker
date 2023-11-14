import { useMutation, useQueryClient } from "react-query";

import { createTodo, completeTodo, deleteTodo } from "../api.ts";
import { Todo } from "../pages/TodoList/types.ts";
import { generateNextId } from "../utils.ts";

export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createTodo, {
    onMutate: async (text) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
        return [
          ...(oldTodos ?? []),
          { text, id: generateNextId(oldTodos), completed: false },
        ];
      });

      return { previousTodos };
    },
    onError: (err, todo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useCompleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(completeTodo, {
    onMutate: ({ id, completed }) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData(
        ["todos"],
        previousTodos?.map((todo) =>
          todo.id == id ? { ...todo, completed } : todo,
        ),
      );

      return { previousTodos };
    },
    onError: (err, todo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTodo, {
    onMutate: ({ id }) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData(
        ["todos"],
        previousTodos?.filter((todo) => todo.id !== id),
      );

      return { previousTodos };
    },
    onError: (err, todo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
