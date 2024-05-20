import { ESeverity } from "./auth.types";

export interface IFormAlertProps {
  severity: ESeverity;
  message: string;
  children?: any;
}

export interface IFormErrorMessageProps {
  errorMessage: string;
}
