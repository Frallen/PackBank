import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import AdminReducer from "./adminReducer";
import AuthReducer from "./authReducer";

let reducers = combineReducers({
  auth: AuthReducer,
  admin: AdminReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
