import { Button, Form, Input, message, Space } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/users";
import { LeftOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useQueryParams } from "../utils/query-params";
import { useAuthContext, useAuthDispatch } from "../contexts/auth.hooks";
import { setAccessToken } from "../contexts/auth.actions";

export const LoginPage = () => {
  const navigate = useNavigate();
  const queryParams = useQueryParams();
  const authContext = useAuthContext();
  const dispatch = useAuthDispatch();
  const [loginForm] = Form.useForm<{ email: string; password: string }>();

  async function handleLogin() {
    try {
      const { email, password } = loginForm.getFieldsValue();
      const response = await login({ email, password });
      if (!response.access_token) {
        return message.error("Missing accessToken. Something went wrong !?");
      }
      dispatch(setAccessToken(response.access_token));
      setTimeout(() => navigate("/"), 200);
    } catch (error: any) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    if (authContext.accessToken) {
      return navigate("/");
    }
    const { email } = queryParams;
    if (email) {
      loginForm.setFieldValue("email", email);
    }
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Form className="w-full" layout="vertical" form={loginForm}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", message: "Only valid email" }]}
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Password is required" }]}
          required
        >
          <Input.Password onKeyUp={(e) => e.key === "Enter" && handleLogin()} />
        </Form.Item>
        <Form.Item>
          <Space className="justify-between w-full">
            <Link to="/register">
              <Button type="link">
                <div className="flex gap-2 items-center">
                  <LeftOutlined />
                  <span>Register</span>
                </div>
              </Button>
            </Link>
            <Button type="primary" onClick={handleLogin}>
              Login
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
