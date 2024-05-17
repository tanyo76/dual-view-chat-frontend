import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthInfo } from "../../types/store.types";
import { removeLocalStorageItem } from "../../utils/localstorage.utils";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  accessToken: "",
  loggedIn: false,
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
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.accessToken = action.payload.accessToken;
      state.loggedIn = true;
    },
  },
});

export const { setAuthState, clearAuthSliceState } = authSlice.actions;
export default authSlice.reducer;
