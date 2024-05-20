import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { getLocalStorageItem } from "../../utils/localstorage.utils";
import { useEffect } from "react";
import { clearAuthSliceState } from "../../store/slices/auth.slice";
import { StoreState } from "../../store";

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
      <Toolbar
        variant="regular"
        sx={{
          backgroundColor: "#151E3D",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="inherit" component="div">
          {firstName} {lastName}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="subtitle1"
            color="inherit"
            component="div"
            sx={{ mr: "30px" }}
          >
            {email}
          </Typography>
          <Button
            variant="contained"
            onClick={logoutHandler}
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
