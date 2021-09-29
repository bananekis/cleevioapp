import { AlertManager } from "react-alert";
import { AxiosError } from "axios";

export const handleError = (err: AxiosError, alert: AlertManager) => {
  if (err.response) alert.error(`Problem with response -  ${err.message}`);
  else if (err.request) alert.error(`Problem with request - ${err.message}`);
  else alert.error(`Error ${err.message}`);
};
