import { ReactNode, useEffect, useReducer } from "react";
import {
  AuthContext,
  AuthDispatchContext,
  defaultAuthValue,
} from "../contexts/auth.contexts";
import { authReducer } from "../contexts/auth.reducers";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, defaultAuthValue);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={state}>
        {props.children}
      </AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};
