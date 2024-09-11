import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import persistor from "../../redux/store";

interface UserState {
  loading: boolean;
  error: unknown;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

export const SignIn = createAsyncThunk(
  "user/signIn",
  async (parameters: { email: string; password: string }) => {
    const { data } = await axios.post(`http://82.157.43.234:8080/auth/login`, {
      email: parameters.email,
      password: parameters.password,
    });
    return data.token;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(SignIn.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
