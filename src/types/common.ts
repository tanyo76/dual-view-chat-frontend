export enum EAlertSeverity {
  error = "error",
  info = "info",
  success = "success",
  warning = "warning",
}

export interface IFormAlertProps {
  severity: EAlertSeverity;
  message: string;
  children?: any;
}

export interface IFormErrorMessageProps {
  errorMessage: string;
}
