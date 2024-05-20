import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useLoginMutation } from "../../services/auth.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormErrorMessage from "../../components/feedback/FormErrorMessage";
import FormAlert from "../../components/feedback/FormAlert";
import { useEffect, useState } from "react";
import { setLocalStorageItem } from "../../utils/localstorage.utils";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../store/slices/auth.slice";
import { ISignInFormInput } from "../../types/auth.types";
import { EAlertSeverity } from "../../types/common";
import { NormalTextButton } from "../../components/common/button.components";

const SignInForm = () => {
  const [login, { isLoading, isSuccess, isError, data, error }] =
    useLoginMutation();

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInFormInput>();
  const onSubmit: SubmitHandler<ISignInFormInput> = (data) => {
    login(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setLocalStorageItem("accessToken", data.accessToken);
      dispatch(setAuthState(data));
      navigate("chat");
    }
  }, [isSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            type={passwordVisibility ? "text" : "password"}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePasswordVisibility}
                  >
                    {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.password?.type === "required" && (
            <FormErrorMessage errorMessage="Password is required" />
          )}
        </div>

        {isError && (
          <FormAlert
            severity={EAlertSeverity.error}
            message={(error as any).data.message}
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
            Sign in
          </NormalTextButton>
        )}

        <NavLink to="/sign-up">Don't have an account?</NavLink>
      </form>
    </>
  );
};

export default SignInForm;
