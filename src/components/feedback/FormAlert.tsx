import { Alert } from "@mui/material";
import { ESeverity } from "../../types/auth.types";

const FormAlert = (props: {
  severity: ESeverity;
  message: string;
  children?: any;
}) => {
  return (
    <Alert severity={props.severity} style={{ padding: 0 }}>
      {props.message}
      {props.children}
    </Alert>
  );
};

export default FormAlert;
