import { createStore, combineReducers } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer
})

const store = createStore(rootReducer)
// Constructs a type consisting of the return type of function Type.
export type RootState = ReturnType<typeof store.getState>

console.log(store, 'store')
console.log(typeof store.getState, 'type of store.getState')

export default store
