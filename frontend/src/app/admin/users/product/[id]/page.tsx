'use client'
import { Button, Layout, Menu, Table } from 'antd';
import { DesktopOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

export default function Products() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [userData, setOneUserData] = useState({ username: '' });
    const [id, setId] = useState('');
    const location = usePathname();
    const columns = [
    {
        title: 'Product Name',
        dataIndex: 'productName',
        key: 'productName',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Sold At',
        dataIndex: 'soldAt',
        key: 'soldAt',
        render: (text: any, record: any) => (
            <span>{record.soldAt ? new Date(record.soldAt).toLocaleDateString() : 'N/A'}</span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
            <>
                <Button onClick={() => {
                    router.push(`/admin/users/edituser/${record.id}`)
                }}>
                    Edit
                </Button>
                <Button onClick={() => {
                    // remove
                }}>
                    Remove
                </Button>
            </>
        ),
    },
];

    // fetch all users
    useEffect(() => {
        setId(location.split('/').pop() || '');
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/admins/api/getAllProducts`);
                setProducts(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        const getOneUserData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/admins/api/getOneUser/${id}`);
                setOneUserData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getOneUserData();
        fetchProducts();
    }, [location, id]);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
        <Layout className="site-layout bg-[#e3e3e3]">
        <Header className="mx-8 site-layout-background bg-[#e3e3e3] font-bold" style={{ padding: 0 }}>{userData.username || ''} Products</Header>
            <Content style={{ margin: '0 16px' }} className='p-8 w-initial overflow-scroll h-auto'>
                <Button className='my-2' onClick={() => {
                    router.push(`/admin/users/product/${id}/addProduct`)
                }}>
                    Add Product To User
                </Button>
            <Table dataSource={products} columns={columns} />
            </Content>
        </Layout>
        </Layout>
    );
}