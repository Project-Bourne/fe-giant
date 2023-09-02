import {
  AnyAction,
  EmptyObject,
  Reducer,
  combineReducers,
} from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";

const rootReducer: Reducer<EmptyObject, AnyAction> = combineReducers({
  auth: authReducer,
});

export default rootReducer;
