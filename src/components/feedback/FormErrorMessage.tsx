import { IFormErrorMessageProps } from "../../types/common";
import { FormErrorMessageComponent } from "../common/feedback.components";

const FormErrorMessage = (props: IFormErrorMessageProps) => {
  return (
    <FormErrorMessageComponent role="alert">
      {props.errorMessage}
    </FormErrorMessageComponent>
  );
};

export default FormErrorMessage;
