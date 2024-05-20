import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthFormLayout from "./layouts/auth-form-layout/AuthFormLayout";
import SignInForm from "./pages/sign-in/SignInForm";
import SignUpForm from "./pages/sign-up/SignUpForm";
import ChatLayout from "./layouts/chat-layout/ChatLayout";
import ChatPage from "./pages/chat/ChatPage";
import { useLazyUserInfoQuery } from "./services/user.service";
import { useDispatch } from "react-redux";
import { clearAuthSliceState, setAuthState } from "./store/slices/auth.slice";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "./utils/localstorage.utils";
import LoadingPage from "./pages/loading/LoadingPage";
import { askForNotificationPermission } from "./utils/notifications";

function App() {
  const [getUserInfo, { isSuccess, isError, isLoading, data }] =
    useLazyUserInfoQuery();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const accessToken = getLocalStorageItem("accessToken");

  useEffect(() => {
    askForNotificationPermission();

    if (accessToken) {
      getUserInfo({ accessToken });
    } else {
      dispatch(clearAuthSliceState());
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const authPayload = { accessToken, ...data };
      dispatch(setAuthState(authPayload));
      navigate("/chat");
    }

    if (isError) {
      removeLocalStorageItem("accessToken");
      dispatch(clearAuthSliceState());
      navigate("/");
    }
  }, [isSuccess, isError]);

  return (
    <>
      {isLoading && <LoadingPage />}

      {!isLoading && (
        <Routes>
          <Route
            index
            element={
              <AuthFormLayout
                heading="Hi, Welcome Back"
                subHeading="Enter you credentials to continue"
              >
                <SignInForm />
              </AuthFormLayout>
            }
          />
          <Route
            path="sign-up"
            element={
              <AuthFormLayout
                heading="Sign up"
                subHeading="Enter you credentials to continue"
              >
                <SignUpForm />
              </AuthFormLayout>
            }
          />

          <Route
            path="chat"
            element={
              <ChatLayout>
                <ChatPage />
              </ChatLayout>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
