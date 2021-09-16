import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import HomeReducer from './reducers/HomeReducer'

const store = createStore(
  combineReducers({
    homeState: HomeReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
