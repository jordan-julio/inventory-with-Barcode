"use client"
import { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    // test api route
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}`).then((response) => {
      console.log(response.data);
    });
  }, []);
  const handleSubmit = async () => {
    try {
      // process.env.BACKEND_HOST
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      const token = localStorage.getItem('token');
      const base64Url = token?.split('.')[1];
      const base64Decrypt = atob(base64Url || '');
      if (JSON.parse(base64Decrypt).type === 'admin') {
        router.push("/admin");
      } else {
        router.push("/member");
      }
    } catch (error) {
      setError("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <main className="bg-[rgb(255,255,255,0.95)] flex min-h-screen flex-col items-center justify-between p-24">
      <Modal open={error ? true : false} onOk={() => {setError('')}} cancelButtonProps={{ style: { display: 'none' }}} closable={false}>
        <p>{error}</p>
      </Modal>
      <Form onFinish={handleSubmit} className="login-form rounded-[10px] bg-[gray] p-8">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
          <div className="flex flex-row w-full justify-evenly">
            <Button type="primary" onClick={
              () => {
                router.push("/");
              }
            } htmlType="submit"
            className="login-form-button">
              Log in
            </Button>
            <Button onClick={() => {
              router.push("/register");
            }} type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
          </div>

      </Form>
    </main>
  );
}