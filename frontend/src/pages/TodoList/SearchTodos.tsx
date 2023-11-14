import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

export const SearchTodos = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState(searchParams.get("s") ?? "");
  const [debouncedText] = useDebounce(text, 1000);

  useEffect(() => {
    if (debouncedText === "") {
      searchParams.delete("s");
    } else {
      searchParams.set("s", debouncedText);
    }
    setSearchParams(searchParams);
  }, [debouncedText]);

  return (
    <form className={className}>
      <input
        className="border rounded-md mr-2 py-1 px-2"
        type="text"
        value={text}
        placeholder="Search"
        onChange={(event) => setText(event.target.value)}
      />
    </form>
  );
};
