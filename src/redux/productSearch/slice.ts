import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Redux-tool-kit 学习

interface ProductSearchState {
  loading: boolean;
  data: any;
  error: unknown;
  pagination: any;
}

const initialState: ProductSearchState = {
  loading: true,
  data: null,
  error: null,
  pagination: null,
};

// retrun promise
export const searchProduct = createAsyncThunk(
  "productSearch/SearchProduct",
  async (parameters: {
    keywords: string;
    nextPage: number | string;
    pageSize: number | string;
  }) => {
    let url = `http://82.157.43.234:8080/api/touristRoutes?pagenumber=${parameters.nextPage}&pagesize=${parameters.pageSize}`;
    if (parameters.keywords) {
      url += `&keyword=${parameters.keywords}`;
    }
    const results = await axios.get(url);
    return {
      data: results.data,
      pagination: JSON.parse(results.headers["x-pagination"]),
    };
  }
);

export const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(
        searchProduct.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
