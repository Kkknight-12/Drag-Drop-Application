import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

// reducers
import taskReducer from "./reducers/tasks"
import { userLoginAndRegisterReducer } from "./reducers/user"
import taskModalReducer from "./reducers/taskModal"

//
const reducer = combineReducers({
  task: taskReducer,
  userLoginAndRegister: userLoginAndRegisterReducer,
  taskModalR: taskModalReducer,
})

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {}

const initialState = {
  userLoginAndRegister: { userInfo: userInfoFromLocalStorage, loading: false, isLoggedIn: userInfoFromLocalStorage.isLoggedIn  },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store