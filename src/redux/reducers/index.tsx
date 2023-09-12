import {
  AnyAction,
  EmptyObject,
  Reducer,
  combineReducers,
} from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const rootReducer: Reducer<EmptyObject, AnyAction> = combineReducers({
  auth: authReducer,
  users: userReducer,
});

export default rootReducer;
