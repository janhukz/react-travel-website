import { createStore, combineReducers, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))
// Constructs a type consisting of the return type of function Type.
export type RootState = ReturnType<typeof store.getState>

console.log(store, 'store')
console.log(typeof store.getState, 'type of store.getState')

export default store
