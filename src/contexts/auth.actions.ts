import { AuthAction, AuthActionType } from "./auth.reducers";

export function setAccessToken(value: string): AuthAction {
  return {
    type: AuthActionType.LOGIN,
    payload: {
      accessToken: value,
    },
  };
}

export function logout(): AuthAction {
  return {
    type: AuthActionType.LOGOUT,
  };
}
