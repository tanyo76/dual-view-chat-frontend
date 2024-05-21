import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthInfo } from "../../types/store.types";
import { removeLocalStorageItem } from "../../utils/localstorage.utils";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  accessToken: "",
  id: "",
  loggedIn: false,
  disableChatActions: false,
  chatErrorObject: { isError: false, message: "" },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    clearAuthSliceState: () => {
      removeLocalStorageItem("accessToken");
      return initialState;
    },
    setAuthState: (state, action: PayloadAction<IAuthInfo>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.accessToken = action.payload.accessToken;
      state.loggedIn = true;
    },
    disableChatInputs: (state) => {
      state.disableChatActions = true;
    },
    enableChatInputs: (state) => {
      state.disableChatActions = false;
    },
    showChatErrorMessage: (state, action: PayloadAction<string>) => {
      state.chatErrorObject = { isError: true, message: action.payload };
    },
    hideChatErrorMessage: (state) => {
      state.chatErrorObject = { isError: false, message: "" };
    },
  },
});

export const {
  setAuthState,
  clearAuthSliceState,
  enableChatInputs,
  disableChatInputs,
  showChatErrorMessage,
  hideChatErrorMessage,
} = authSlice.actions;
export default authSlice.reducer;
