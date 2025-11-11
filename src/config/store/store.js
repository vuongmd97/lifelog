import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../modules/auth/authSlice";
import userReducer from "../../modules/redux/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
