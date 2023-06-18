import { combineReducers, createStore } from 'redux'
import { authReducer } from 'store/auth/auth-reducer'
import { listen } from 'store/listeners'

const rootReducer = combineReducers({
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)

listen(store)

export default store
