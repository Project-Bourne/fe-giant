import {
  AnyAction,
  EmptyObject,
  Reducer,
  combineReducers,
} from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import documentReducer from "./documentReducer";

const rootReducer: Reducer<EmptyObject, AnyAction> = combineReducers({
  auth: authReducer,
  users: userReducer,
  documents: documentReducer,
});

export default rootReducer;
