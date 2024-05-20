import { Alert } from "@mui/material";
import { IFormAlertProps } from "../../types/common";

const FormAlert = (props: IFormAlertProps) => {
  return (
    <Alert severity={props.severity} style={{ padding: 0 }}>
      {props.message}
      {props.children}
    </Alert>
  );
};

export default FormAlert;
