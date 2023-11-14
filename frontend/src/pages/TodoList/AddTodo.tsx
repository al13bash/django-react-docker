import React, { useState } from "react";
import cx from "classnames";

import { useAddTodoMutation } from "../../hooks/todos.ts";

export const AddTodo = ({ className }) => {
  const [text, setText] = useState("");

  const addTodoMutation = useAddTodoMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodoMutation.mutate(text);
    setText("");
  };

  const isDisabled = addTodoMutation.isLoading || !text;

  return (
    <form className={className} onSubmit={handleSubmit}>
      <input
        className="border rounded-md mr-2 py-1 px-2"
        value={text}
        type="text"
        placeholder="Todo Text"
        onChange={(event) => setText(event.target.value)}
      />
      <button
        className={cx("border rounded-md py-1 px-3", {
          "bg-gray-300 text-black": isDisabled,
          "bg-green-700 text-white hover:bg-green-800": !isDisabled,
        })}
        disabled={isDisabled}
      >
        Add Todo
      </button>
    </form>
  );
};
