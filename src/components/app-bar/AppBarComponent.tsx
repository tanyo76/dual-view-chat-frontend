import { AppBar, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { getLocalStorageItem } from "../../utils/localstorage.utils";
import { useEffect } from "react";
import { clearAuthSliceState } from "../../store/slices/auth.slice";
import { StoreState } from "../../store";
import { NormalTextButton } from "../common/button.components";
import { CenteredBox, ToolBarComponent } from "../common/appBar.components";

const AppBarComponent = () => {
  const { firstName, lastName, email } = useSelector(
    (store: StoreState) => store.auth
  );

  const [logout, { isSuccess, isError, isLoading }] = useLogoutMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    const accessToken = getLocalStorageItem("accessToken");
    logout({ accessToken });
  };

  useEffect(() => {
    if (isSuccess || isError) {
      dispatch(clearAuthSliceState());
      navigate("/");
    }
  }, [isSuccess, isError]);

  return (
    <AppBar position="static">
      <ToolBarComponent variant="regular">
        <Typography variant="h6" color="inherit" component="div">
          {firstName} {lastName}
        </Typography>

        <CenteredBox sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="subtitle1"
            color="inherit"
            component="div"
            sx={{ mr: "30px" }}
          >
            {email}
          </Typography>
          <NormalTextButton
            variant="contained"
            onClick={logoutHandler}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress /> : "Logout"}
          </NormalTextButton>
        </CenteredBox>
      </ToolBarComponent>
    </AppBar>
  );
};

export default AppBarComponent;
