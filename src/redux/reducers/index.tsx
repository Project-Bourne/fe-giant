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
import reportReducer from "./reportReducer";

const rootReducer: Reducer<EmptyObject, AnyAction> = combineReducers({
  auth: authReducer,
  users: userReducer,
  documents: documentReducer,
  ui: uiReducer,
  reports: reportReducer,
});

export default rootReducer;
