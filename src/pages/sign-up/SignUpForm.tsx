import { CircularProgress, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSignUpMutation } from "../../services/auth.service";
import { SubmitHandler, useForm } from "react-hook-form";
import FormErrorMessage from "../../components/feedback/FormErrorMessage";
import FormAlert from "../../components/feedback/FormAlert";
import { ISignUpFormInput } from "../../types/auth.types";
import { EAlertSeverity } from "../../types/common";
import { NormalTextButton } from "../../components/common/button.components";

const SignUpForm = () => {
  const [signUp, { isLoading, isError, isSuccess, error, data }] =
    useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormInput>();
  const onSubmit: SubmitHandler<ISignUpFormInput> = (data) => {
    signUp(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formTextField">
          <TextField
            size="small"
            label="Firstname"
            variant="outlined"
            type="text"
            {...register("firstName", { required: true })}
            disabled={isLoading}
          />

          {errors.firstName?.type === "required" && (
            <FormErrorMessage errorMessage="Firstname is required" />
          )}
        </div>

        <div className="formTextField">
          <TextField
            size="small"
            label="Lastname"
            variant="outlined"
            type="text"
            {...register("lastName", { required: true })}
            disabled={isLoading}
          />

          {errors.lastName?.type === "required" && (
            <FormErrorMessage errorMessage="Lastname is required" />
          )}
        </div>

        <div className="formTextField">
          <TextField
            size="small"
            label="Email"
            variant="outlined"
            type="email"
            {...register("email", { required: true })}
            disabled={isLoading}
          />

          {errors.email?.type === "required" && (
            <FormErrorMessage errorMessage="Email is required" />
          )}
        </div>

        <div className="formTextField">
          <TextField
            size="small"
            label="Password"
            variant="outlined"
            {...register("password", { required: true })}
            type="password"
            disabled={isLoading}
          />
          {errors.password?.type === "required" && (
            <FormErrorMessage errorMessage="Password is required" />
          )}
        </div>

        <div className="formTextField">
          <TextField
            size="small"
            label="Confirm password"
            variant="outlined"
            {...register("confirmPassword", { required: true })}
            type="password"
            disabled={isLoading}
          />
          {errors.password?.type === "required" && (
            <FormErrorMessage errorMessage="Password confirmation is required" />
          )}
        </div>

        {isError && (
          <FormAlert
            severity={EAlertSeverity.error}
            message={(error as any).data.message}
          />
        )}

        {isSuccess && (
          <FormAlert
            severity={EAlertSeverity.success}
            message={`${data.msg}`}
            children={<NavLink to={"/"}>Sign in</NavLink>}
          />
        )}

        {isLoading ? (
          <CircularProgress />
        ) : (
          <NormalTextButton
            type="submit"
            disabled={isLoading}
            variant="contained"
          >
            Sign up
          </NormalTextButton>
        )}

        <NavLink to="/">Already have an account?</NavLink>
      </form>
    </>
  );
};

export default SignUpForm;
