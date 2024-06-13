"use client";
import Sidebar from "@/components/sidebar";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout, message, Select } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Path: src/app/admin/users/adduser/page.tsx
export default function AddProduct() {
    const [form] = Form.useForm();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [categoriesDropdownData, setCategoriesDropdownData] = useState([]);
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'New Product Added Successfully!',
          duration: 5,
        });
      };
    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const response = await axios.get(`${process.env.BACKEND_HOST}/admins/api/getAllCategories`);
                setCategoriesDropdownData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAllCategories();
    }, []);
    const handleSubmit = async (values: any) => {
        try {
            // hash password
            console.log(values);
            const response = await axios.post(`${process.env.BACKEND_HOST}/admins/api/addProduct`, { 
                productName: values.productName, 
                description: values.productDescription,
                price: values.productPrice,
                category: values.productCategory,
                // productImage: values.productImage,
                quantity: values.productQuantity,
            });
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
                            name="productCategory"
                            rules={[{ required: true, message: 'Please select category!' }]}
                        >
                            <Select placeholder="Select Category">
                                {categoriesDropdownData?.map((category: any) => {
                                    return <Option key={category.id} value={category.id}>{category.categoryName}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="productName"
                            rules={[{ required: true, message: 'Please input product name!' }]}
                        >
                            <Input placeholder="Product Name" />
                        </Form.Item>
                        <Form.Item
                            name="productDescription"
                            rules={[{ required: true, message: 'Please input description!' }]}
                        >
                            <Input placeholder="Description" />
                        </Form.Item>
                        <Form.Item
                            name="productPrice"
                            rules={[{ required: true, message: 'Please input price!' }]}
                        >
                            <Input placeholder="Price" />
                        </Form.Item>
                        <Form.Item
                            name="productQuantity"
                            rules={[{ required: true, message: 'Please input quantity!' }]}
                        >
                            <Input placeholder="Quantity" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Add Product
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    );
}