import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Redux-tool-kit 学习

interface shoppingCartState {
  loading: boolean;
  items: any[];
  error: unknown;
}

const initialState: shoppingCartState = {
  loading: true,
  items: [],
  error: null,
};

// retrun promise
export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (jwt: string) => {
    const { data } = await axios.get(
      `http://82.157.43.234:8080/api/shoppingCart`,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async (parameters: { jwt: string; touristRouteId: string }) => {
    const { data } = await axios.post(
      `http://82.157.43.234:8080/api/shoppingCart/items`,
      {
        touristRouteId: parameters.touristRouteId,
      },
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

export const clearShoppingCartItem = createAsyncThunk(
  "shoppingCart/clearShoppingCartItem",
  async (parameters: { jwt: string; itemIds: number[] }) => {
    return await axios.delete(
      `http://82.157.43.234:8080/api/shoppingCart/items/(${parameters.itemIds.join(
        ","
      )})`,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
  }
);

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShoppingCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShoppingCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(
        getShoppingCart.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(addShoppingCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addShoppingCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(
        addShoppingCartItem.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(clearShoppingCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearShoppingCartItem.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(
        clearShoppingCartItem.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
