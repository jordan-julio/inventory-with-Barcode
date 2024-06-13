"use client";
import Sidebar from "@/components/sidebar";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout, message } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { useRouter } from "next/navigation";

// Path: src/app/admin/users/adduser/page.tsx
export default function AddUser() {
    const [form] = Form.useForm();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'User Registered Successfully!',
          duration: 5,
        });
      };
    const handleSubmit = async (values: any) => {
        try {
            // hash password
            const salt = genSaltSync(10);
            const hash = hashSync(values.password, salt);
            const response = await axios.post(`${process.env.BACKEND_HOST}/admins/api/register`, { email: values.email, username: values.username, password: hash });
            form.resetFields();
            success();
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout className="site-layout bg-[#e3e3e3]">
            <Header className="mx-8 site-layout-background bg-[#e3e3e3] font-bold" style={{ padding: 0 }}>Add User Form</Header>
            {contextHolder}
                <Content className=''>
                    {/** add a pop up that says successfull if axios works */}
                    
                    <Form form={form} onFinish={handleSubmit} className="login-form p-8">
                    <Form.Item
                            name="username"
                            rules={[{ required: true, message: "Please input your Username!" }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: "Please input your Username!" }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Please input your Password!" }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Add User
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    );
}