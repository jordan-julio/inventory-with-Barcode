'use client'
import { Layout, Menu, Table } from 'antd';
import { DesktopOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import SidebarMember from '@/components/member/memberSidebar';

const { Header, Content, Footer, Sider } = Layout;

export default function Admin() {
  const data = [
    {
      key: '1',
      name: 'John Doe',
      age: 32,
      address: '10 Downing Street',
    },
    // ... more data
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <SidebarMember />
      <Layout className="site-layout bg-[#e3e3e3]">
        <Header className="mx-8 site-layout-background bg-[#e3e3e3] font-bold" style={{ padding: 0 }}>Dashboard</Header>
        <Content style={{ margin: '0 16px' }}>
          <Table dataSource={data} columns={columns} />
        </Content>
      </Layout>
    </Layout>
  );
}