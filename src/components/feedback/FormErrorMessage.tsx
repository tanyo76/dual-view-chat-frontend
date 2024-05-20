import { FormHelperText } from "@mui/material";
import { IFormErrorMessageProps } from "../../types/common";

const FormErrorMessage = (props: IFormErrorMessageProps) => {
  return (
    <FormHelperText role="alert" style={{ color: "#dc3545" }}>
      {props.errorMessage}
    </FormHelperText>
  );
};

export default FormErrorMessage;
