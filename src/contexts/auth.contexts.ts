import React, { createContext, DispatchWithoutAction } from "react";
import { AuthAction } from "./auth.reducers";

export interface AuthContextProps {
  accessToken: string;
}

export interface AuthDispatchContextProps {
  dispatch: React.Dispatch<AuthAction>;
}

export const defaultAuthValue = { accessToken: "" };
export const defaultDispatch = () => null;
export const AuthContext = createContext<AuthContextProps>(defaultAuthValue);
export const AuthDispatchContext =
  createContext<React.Dispatch<AuthAction>>(defaultDispatch);
