import { AuthContextProps, defaultAuthValue } from "./auth.contexts";

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type AuthAction =
  | {
      type: AuthActionType.LOGIN;
      payload: Omit<AuthContextProps, "dispatch">;
    }
  | {
      type: AuthActionType.LOGOUT;
      payload?: null;
    };

export function authReducer(state: AuthContextProps, action: AuthAction) {
  const { type, payload } = action;
  switch (type) {
    case AuthActionType.LOGIN: {
      return { ...state, accessToken: payload.accessToken };
    }
    case AuthActionType.LOGOUT: {
      return defaultAuthValue;
    }
    default:
      throw new Error(`Action: ${type}  not found`);
  }
}
