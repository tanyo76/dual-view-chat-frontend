export interface ISignInFormInput {
  email: string;
  password: string;
}

export interface ISignUpFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export enum ESeverity {
  error = "error",
  info = "info",
  success = "success",
  warning = "warning",
}
