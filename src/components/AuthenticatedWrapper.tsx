import { message } from "antd";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.hooks";

interface AuthenticatedWrapperProps {
  children?: ReactNode;
}

export const AuthenticatedWrapper = (props: AuthenticatedWrapperProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useAuthContext();

  useEffect(() => {
    if (!authContext.accessToken) {
      message.error("Login required");
      return navigate("/login");
    }
  }, [location.pathname]);

  return <>{props.children}</>;
};
