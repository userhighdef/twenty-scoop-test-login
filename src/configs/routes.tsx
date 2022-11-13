import { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { AuthenticatedWrapper } from "../components/AuthenticatedWrapper";
import { AuthProvider } from "../components/AuthProvider";
import { Container } from "../components/Container";
import { HomePage } from "../pages/Home.page";
import { LoginPage } from "../pages/Login.page";
import { RegisterPage } from "../pages/Register.page";

type RouteAdditionalOptions = {
  requiredAuth?: boolean;
};

export const routes: Array<RouteObject & RouteAdditionalOptions> = [
  {
    path: "/",
    element: <HomePage />,
    requiredAuth: true,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

const withRequiredAuth = routes.map((item) => {
  if (item.requiredAuth) {
    return {
      ...item,
      element: <AuthenticatedWrapper>{item.element}</AuthenticatedWrapper>,
    };
  }
  return item;
});

const withPageContainer = withRequiredAuth.map((item) => ({
  ...item,
  element: <Container>{item.element}</Container>,
}));

export const router = createBrowserRouter(withPageContainer);
