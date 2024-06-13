'use client'
import { Image, Layout, Menu, Table } from 'antd';
import { DesktopOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Sidebar from '@/components/sidebar';

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
        <Sidebar />
      <Layout className="site-layout bg-[#e3e3e3]">
        <Header className="mx-8 site-layout-background bg-[#e3e3e3] font-bold" style={{ padding: 0 }}>Dashboard</Header>
        <Content style={{ margin: '0 16px' }}>
          <Image preview={false} alt="dashboard example" src="https://agencyanalytics.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fdfcvkz6j859j%2F3yyuVQqgzMOMr2AGytPI4u%2F85f2a29fa2b977819e36531d96c85fa2%2FWeb-Analytics-Dashboard-Template-Example.png&w=3840&q=75" />
        </Content>
      </Layout>
    </Layout>
  );
}