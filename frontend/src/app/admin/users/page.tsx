'use client'
import { Button, Layout, Menu, Table } from 'antd';
import { DesktopOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

export default function AdminUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: { id: any; }) => (
                <>
                <Button onClick={() => {
                    router.push(`/admin/users/product/${record.id}`)
                }}>
                    Add/Remove Products
                </Button>
                <Button onClick={() => {
                    router.push(`/admin/users/edituser/${record.id}`)
                }}>
                    Edit
                </Button>
                <Button onClick={async () => {
                    await axios.delete(`${process.env.BACKEND_HOST}/admins/api/deleteOneUser/${record.id}`)
                    router.refresh();
                }}>
                    Delete User
                </Button>
                </>
            ),
        },
    ];

    // fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.BACKEND_HOST}/admins/api/getAllUsers`);
                setUsers(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
        <Layout className="site-layout bg-[#e3e3e3]">
        <Header className="mx-8 site-layout-background bg-[#e3e3e3] font-bold" style={{ padding: 0 }}>Users</Header>
            <Content style={{ margin: '0 16px' }} className='p-8'>
                <Button className='my-2' onClick={() => {
                    router.push('/admin/users/adduser')
                }}>
                    Add User
                </Button>
            <Table dataSource={users} columns={columns} />
            </Content>
        </Layout>
        </Layout>
    );
}