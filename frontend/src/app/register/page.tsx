"use client"
import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { genSaltSync, hashSync } from "bcrypt-ts";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const base64Url = token?.split('.')[1];
    const base64Decrypt = atob(base64Url || '');
    if (JSON.parse(base64Decrypt).type === 'admin') {
      router.push("/admin");
    } else {
      router.push("/member");
    }
  }, [router]);
  
  const handleSubmit = async () => {
    try {
      // hash password
      const salt = genSaltSync(10);
      const hash = hashSync(password, salt);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/register`, { email: email, username: username, password: hash });
      localStorage.setItem("token", response.data.token);
      // decrypt jwt get the base64 data and get token.type if 'admin' router.push to /admin else router.push to /member
      const token = localStorage.getItem('token');
      const base64Url = token?.split('.')[1];
      const base64Decrypt = atob(base64Url || '');
      if (JSON.parse(base64Decrypt).type === 'admin') {
        router.push("/admin");
      } else {
        router.push("/member");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="bg-[rgb(255,255,255,0.95)] flex min-h-screen flex-col items-center justify-between p-24">
      <Form onFinish={handleSubmit} className="login-form rounded-[10px] bg-[gray] p-8">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
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
            Register
          </Button>
        </Form.Item>
          <div className="flex flex-row w-full justify-evenly">
            <Button type="primary" onClick={() => {
              router.push("/");
            }} className="login-form-button">
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