import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { actionLog } from "./middlewares/actionLog";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productDetailSlice } from "./productionDetail/slice";
import { productSearchSlice } from "./productSearch/slice";
import { userSlice } from "./user/slice";

// rootReducer是约定俗称的命名，表示所有Reducers的集合体
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productionDetail: productDetailSlice.reducer,
  productionSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
});

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
  devTools: true,
});

// Constructs a type consisting of the return type of function Type.
export type RootState = ReturnType<typeof store.getState>;

console.log(store, "store");
console.log(typeof store.getState, "type of store.getState");

export default store;
