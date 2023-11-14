import React from "react";
import { useQuery } from "react-query";
import cx from "classnames";
import { useSearchParams } from "react-router-dom";

import { AddTodo } from "./AddTodo.tsx";
import { FilterTodos } from "./FilterTodos.tsx";
import { SearchTodos } from "./SearchTodos.tsx";
import { Todo } from "./types.ts";

import { TrashIcon } from "../../icons/index.ts";
import { fetchTodos } from "../../api.ts";
import {
  useDeleteTodoMutation,
  useCompleteTodoMutation,
} from "../../hooks/todos.ts";

const getQueryKey = (searchParams: URLSearchParams) => {
  let key = ["todos"];
  if (searchParams.has("completed")) {
    key.push(`completed=${searchParams.get("completed")}`);
  }
  if (searchParams.has("s")) {
    key.push(`s=${searchParams.get("s")}`);
  }
  return key;
};

export const TodoList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, error, data } = useQuery<Todo[], Error>(
    getQueryKey(searchParams),
    () => fetchTodos(searchParams),
  );

  const completeTodoMutation = useCompleteTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: {error.message}</p>;

  return (
    <>
      <AddTodo className="mb-4" />
      <FilterTodos className="flex justify-between mb-4" />
      <SearchTodos className="mb-4" />
      <ul className="flex flex-col gap-2">
        {data?.map((todo) => (
          <li key={todo.id} className="group flex border-b">
            <input
              className="mr-2"
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                completeTodoMutation.mutate({
                  id: todo.id,
                  completed: !todo.completed,
                })
              }
            />
            <span
              className={cx("flex-1", {
                "line-through text-gray-500": todo.completed,
              })}
            >
              {todo.text}
            </span>
            <button
              className="flex items-center opacity-0 group-hover:opacity-100 group-hover:transition-all duration-250"
              onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
            >
              <TrashIcon className="inline-block w-4 h-4 text-gray-500" />
              <span className="sr-only">Delete</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
