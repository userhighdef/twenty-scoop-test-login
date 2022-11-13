import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { logout } from "../contexts/auth.actions";
import { useAuthContext, useAuthDispatch } from "../contexts/auth.hooks";
import { UserType } from "../services/db";
import { getMyData } from "../services/users";

export const HomePage = () => {
  const authContext = useAuthContext();
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [user, setUser] =
    useState<Omit<UserType, "access_token" | "password">>();

  function handleLogout() {
    authDispatch(logout());
    setTimeout(() => navigate("/login"));
  }

  useEffect(() => {
    getMyData(authContext.accessToken).then((res) => setUser(res));
  }, []);

  return (
    <div className="h-full">
      <nav className="w-full flex justify-end py-4">
        <Button onClick={handleLogout}>Logout</Button>
      </nav>
      <table className="border-collapse w-full">
        <tbody>
          <tr>
            <th className="border p-4">Key</th>
            <th className="border p-4">Value</th>
          </tr>
          {user &&
            [...Object.entries(user)].map(([key, value], i) => (
              <tr key={i}>
                <td className="border p-4">{key}</td>
                <td className="border p-4">{value.toString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
