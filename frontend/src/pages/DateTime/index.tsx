import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { fetchDateTime } from "../../api.ts";
import { DateTime as DateTimeType } from "./types.ts";

export const DateTime = () => {
  const [currentTime, setCurrentTime] = useState("0");
  const [currentDate, setCurrentDate] = useState("0");

  const { isLoading, error, data } = useQuery<DateTimeType, Error>(
    "datetime",
    fetchDateTime,
  );

  useEffect(() => {
    if (data) {
      setCurrentTime(data.time);
      setCurrentDate(data.date);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: {error.message}</p>;

  return (
    <p>
      The date is {currentDate} and the time is {currentTime}.
    </p>
  );
};
