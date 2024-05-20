import { IFormAlertProps } from "../../types/common";
import { FormAlertComponent } from "../common/feedback.components";

const FormAlert = (props: IFormAlertProps) => {
  return (
    <FormAlertComponent severity={props.severity}>
      {props.message}
      {props.children}
    </FormAlertComponent>
  );
};

export default FormAlert;
