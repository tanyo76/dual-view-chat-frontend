import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../services/auth.service";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../../utils/localstorage.utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthSliceState } from "../../store/slices/auth.slice";

const ChatLayout = ({ children }: any) => {
  const { firstName, lastName, email } = useSelector(
    (store: any) => store.auth
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
    <div>
      <p>
        {firstName} {lastName} ({email})
      </p>
      <Button variant="contained" onClick={logoutHandler} disabled={isLoading}>
        {isLoading ? "Logging out..." : "Logout"}
      </Button>
      {children}
    </div>
  );
};

export default ChatLayout;
