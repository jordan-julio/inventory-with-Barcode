"use client";
import Sidebar from "@/components/sidebar";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout, message } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Path: src/app/admin/users/adduser/page.tsx
export default function AddUser() {
    const [form] = Form.useForm();
    const router = useRouter();
    const params = useSearchParams();
    const location = usePathname();
    const [id, setId] = useState<string>("");
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Category Edited Successfully!',
          duration: 5,
        });
      };
    useEffect(() => {
        setId(location.split('/').pop() || '');
        const getOneCategoryData = async (id: string) => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/admins/api/getOneCategory/${id}`);
                form.setFieldsValue({
                    categoryName: response.data.data.categoryName,
                    description: response.data.data.description,
                });
            } catch (error) {
                console.error(error);
            }
        }
        if (id !== "") getOneCategoryData(id as string);
        // getOneUserData(params as string);
    }, [form, id, location]);

    const handleSubmit = async (values: any) => {
        try {
            // hash password
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/admins/api/editOneCategory`, { id: id, categoryName: values.categoryName, description: values.description});
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
                                Edit Category
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    );
}