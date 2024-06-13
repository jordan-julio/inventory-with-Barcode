'use client'
import { Button, Layout, Menu, Table } from 'antd';
import { DesktopOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

export default function Category() {
    const router = useRouter();
    const [category, setCategory] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: any) => (
                <Button onClick={() => {
                    router.push(`/admin/category/editCategory/${record.id}`)
                }}>
                    Edit
                </Button>
            ),
        },
    ];

    // fetch all users
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/admins/api/getAllCategories`);
                setCategory(response.data.data);
                setTotalQuantity(response.data.data.length);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
        <Layout className="site-layout bg-[#e3e3e3]">
        <Header className="mx-8 site-layout-background bg-[#e3e3e3] font-bold" style={{ padding: 0 }}>Categories</Header>
            <Content style={{ margin: '0 16px' }} className='p-8'>
                <Button className='my-2' onClick={() => {
                    router.push('/admin/category/addCategory')
                }}>
                    Add Category
                </Button>
            <Table dataSource={category} columns={columns} />
            </Content>
        </Layout>
        </Layout>
    );
}