import { FormHelperText } from "@mui/material";

const FormErrorMessage = (props: { errorMessage: string }) => {
  return (
    <FormHelperText role="alert" style={{ color: "#dc3545" }}>
      {props.errorMessage}
    </FormHelperText>
  );
};

export default FormErrorMessage;
