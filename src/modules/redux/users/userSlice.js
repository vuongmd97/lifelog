import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "./userService";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { getState }) => {
    const userId = getState().auth.userId;
    const data = await UserService.fetchUserProfile(userId);
    return data;
  }
);

export const upsertProfiles = createAsyncThunk(
  "user/upsertProfiles",
  async (profileData, { getState }) => {
    const userId = getState().auth.userId;
    const data = await UserService.upsertProfiles(profileData, userId);
    return data;
  }
);

const initialState = {
  loading: true,
  error: null,
  profiles: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Upsert Profiles
      .addCase(upsertProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
      })
      .addCase(upsertProfiles.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
