import { useContext, useReducer } from "react";
import {
  AuthContext,
  AuthDispatchContext,
  defaultAuthValue,
} from "./auth.contexts";
import { authReducer } from "./auth.reducers";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
}

export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (dispatch === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return dispatch;
}
