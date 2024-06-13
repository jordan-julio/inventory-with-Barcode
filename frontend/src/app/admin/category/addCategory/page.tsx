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
          content: 'New Product Category Added Successfully!',
          duration: 5,
        });
      };
    const handleSubmit = async (values: any) => {
        try {
            // hash password
            const response = await axios.post(`${process.env.BACKEND_HOST}/admins/api/addCategory`, { categoryName: values.categoryName, description: values.description });
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
                            name="categoryName"
                            rules={[{ required: true, message: 'Please input category name!' }]}
                        >
                            <Input placeholder="Category Name" />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: 'Please input description!' }]}
                        >
                            <Input placeholder="Description" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Add Category
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    );
}