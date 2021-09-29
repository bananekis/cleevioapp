// inspiration: https://stackoverflow.com/a/67925450

import { OnDateChangeProps } from "@datepicker-react/styled";

export const formatDate = (data: OnDateChangeProps) => {
  if (data.date !== null) {
    const inputDate = new Date(data.date.toString().split(/\+|-/)[0]);
    const formattedInputDate = new Date(inputDate).toISOString().split("T")[0];
    return formattedInputDate;
  } else return "";
};
