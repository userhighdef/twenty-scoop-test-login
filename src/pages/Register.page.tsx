import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
} from "antd";
import { Rule } from "antd/lib/form";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/users";

const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "N/A",
    value: "n/a",
  },
];

const requiredRule: Rule = {
  required: true,
  message: "Required!",
};

export const RegisterPage = () => {
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const data = registerForm.getFieldsValue();
      console.log(data);
      const result = await register(data);
      if (!result) {
        return message.error("Register failed");
      }
      message.success("Register Success");
      navigate(`/login?email=${data.email}`);
    } catch (error: any) {
      message.error(error.message);
    }
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Form layout="vertical" form={registerForm} onFinish={handleRegister}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            requiredRule,
            { type: "email", message: "Only a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[requiredRule]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[requiredRule]}>
          <Select options={genderOptions} />
        </Form.Item>
        <Form.Item name="firstname" label="First name" rules={[requiredRule]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastname" label="Last name" rules={[requiredRule]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[requiredRule]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="postcode" label="Post code" rules={[requiredRule]}>
          <InputNumber minLength={5} maxLength={5} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Telephone"
          rules={[
            requiredRule,
            {
              validator(rule, value) {
                if (value.toString().length !== 9) {
                  return Promise.reject("Invalid format");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            controls={false}
            style={{ width: "100%" }}
            addonBefore={"+66(0)"}
            stringMode
          />
        </Form.Item>
        <Form.Item
          name="tocAccepted"
          label="Terms and conditions"
          requiredMark
          getValueFromEvent={(e) => e.target.checked}
          valuePropName="checked"
          rules={[
            {
              validator(rule, value) {
                if (value === true) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "You have to accept terms and conditions"
                );
              },
            },
          ]}
        >
          <Checkbox>I agree to these Terms and Conditions</Checkbox>
        </Form.Item>
        <Form.Item>
          <Space className="w-full justify-between">
            <Link to="/login">
              <Button type="link">
                <div className="flex gap-2 items-center">
                  <LeftOutlined />
                  <span>Login</span>
                </div>
              </Button>
            </Link>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
