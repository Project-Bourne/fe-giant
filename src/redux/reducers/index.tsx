import {
  AnyAction,
  EmptyObject,
  Reducer,
  combineReducers,
} from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import documentReducer from "./documentReducer";
import uiReducer from "./uiReducer";

const rootReducer: Reducer<EmptyObject, AnyAction> = combineReducers({
  auth: authReducer,
  users: userReducer,
  documents: documentReducer,
  ui: uiReducer,
});

export default rootReducer;
