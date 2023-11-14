import Cookies from "js-cookie";

import { Todo } from "./pages/TodoList/types.ts";
import { DateTime } from "./pages/DateTime/types.ts";

const baseUrl = "http://localhost:8000";

const defaultHeaders = {
  "Content-type": "application/json; charset=UTF-8",
  "X-CSRFToken": Cookies.get("csrftoken"),
};

export const sendRequest = (path: string, params?: RequestInit | undefined) => {
  return fetch(baseUrl + path, {
    ...(params ?? {}),
    credentials: "include",
  }).then((res) => res.json());
};

export const fetchDateTime = (): Promise<DateTime> => sendRequest("/datetime");

export const createTodo = (text: string): Promise<Todo> => {
  return sendRequest("/todos/create", {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: defaultHeaders,
  });
};

export const fetchTodos = (searchParams: URLSearchParams) => {
  let url = "/todos";
  const params = new URLSearchParams();
  if (searchParams.has("completed")) {
    params.set("completed", searchParams.get("completed")!);
  }
  if (searchParams.has("s")) {
    params.set("s", searchParams.get("s")!);
  }

  if (params) {
    url += `?${params.toString()}`;
  }

  return sendRequest(url);
};

export const completeTodo = ({
  id,
  completed,
}: {
  id: number;
  completed: boolean;
}) =>
  sendRequest(`/todos/${id}`, {
    method: "POST",
    body: JSON.stringify({ completed }),
    headers: defaultHeaders,
  });

export const deleteTodo = ({ id }: { id: number }) =>
  sendRequest(`/todos/${id}/delete`, {
    method: "POST",
    headers: defaultHeaders,
  });
