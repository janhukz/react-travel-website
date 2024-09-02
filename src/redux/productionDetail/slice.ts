import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Redux-tool-kit 学习

interface ProductionDetailState {
  loading: boolean;
  data: any;
  error: unknown;
}

const initialState: ProductionDetailState = {
  loading: true,
  data: null,
  error: null,
};

// retrun promise
export const getProductDetail = createAsyncThunk(
  "productionDetail/getProductDetail",
  async (touristRouteId: string) => {
    const { data } = await axios.get(
      `http://82.157.43.234:8080/api/touristRoutes/${touristRouteId}`
    );
    return data;
  }
);

export const productionDetailSlice = createSlice({
  name: "productionDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(
        getProductDetail.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
