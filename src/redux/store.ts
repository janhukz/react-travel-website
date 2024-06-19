import { createStore, combineReducers, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import thunk from 'redux-thunk'
import { actionLog } from "./middlewares/actionLog";

 
// rootReducer是约定俗称的命名，表示所有Reducers的集合体
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk,actionLog))


// Constructs a type consisting of the return type of function Type.
export type RootState = ReturnType<typeof store.getState>

console.log(store, 'store')
console.log(typeof store.getState, 'type of store.getState')

export default store
