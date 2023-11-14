import React from "react";
import { useSearchParams } from "react-router-dom";

export const FilterTodos = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (event) => {
    const { name, value } = event?.target;

    if (value === "all") {
      searchParams.delete("completed");
      setSearchParams(searchParams);
    } else {
      searchParams.set(name, value);
      setSearchParams(searchParams);
    }
  };

  return (
    <fieldset className={className}>
      <div>
        <input
          className="mr-1"
          type="radio"
          id="all"
          name="completed"
          value="all"
          defaultChecked={!searchParams.has("completed")}
          onChange={onChange}
        />
        <label htmlFor="all">All</label>
      </div>

      <div>
        <input
          className="mr-1"
          type="radio"
          id="active"
          name="completed"
          value="False"
          defaultChecked={searchParams.get("completed") == "False"}
          onChange={onChange}
        />
        <label htmlFor="active">Active</label>
      </div>

      <div>
        <input
          className="mr-1"
          type="radio"
          id="completed"
          name="completed"
          value="True"
          defaultChecked={searchParams.get("completed") == "True"}
          onChange={onChange}
        />
        <label htmlFor="completed">Completed</label>
      </div>
    </fieldset>
  );
};
