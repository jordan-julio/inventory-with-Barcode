import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
  ProductOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';

const { Sider } = Layout;

function SidebarMember() {
  const location = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    if (location.startsWith('/admin/users')) {
      setSelectedKey('2');
    } else if (location.startsWith('/admin/products')) {
      setSelectedKey('3');
    } else if (location.startsWith('/admin')) {
      setSelectedKey('1');
    } else {
      setSelectedKey('1');
    }
  }, [location]);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="light" selectedKeys={[selectedKey]} mode="inline" className='h-full bg-[#e3e3e3]'>
        <Menu.Item onClick={() => {router.push('/member/products'); setSelectedKey('3')}} key="3" icon={<ProductOutlined />}>
          Products
        </Menu.Item>
        <Menu.Item onClick={() => {localStorage.removeItem('token'); router.push('/') ;setSelectedKey('1')}} key="4" icon={<ProductOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SidebarMember;