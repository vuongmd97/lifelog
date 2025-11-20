import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "./authService";

export const handleSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, firstName, lastName }) => {
    const data = await AuthService.signUp(email, password, firstName, lastName);
    return data;
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  await AuthService.signOut();
});

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }) => {
    const data = await AuthService.signIn(email, password);
    return data;
  }
);

const initialState = {
  loading: true,
  error: null,
  accessToken: null,
  refreshToken: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSession(state, action) {
      const { session } = action.payload || {};
      state.accessToken = session?.access_token ?? null;
      state.refreshToken = session?.refresh_token ?? null;
      state.userId = session?.user?.id ?? null;
      state.loading = false;
    },
    clearSession(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // signUp
      .addCase(handleSignUp.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // signOut
      .addCase(signOut.fulfilled, (state) => {
        localStorage.removeItem("theme");
        document.body.className = "";

        state.accessToken = null;
        state.refreshToken = null;
        state.userId = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // signIn
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
