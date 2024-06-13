import { useEffect, useState } from 'react';
import { Image, Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
  ProductOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';

const { Sider } = Layout;

function Sidebar() {
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
    } else if (location.startsWith('/admin/category')) {
      setSelectedKey('3');
    } else if (location.startsWith('/admin/products')) {
        setSelectedKey('4');
    } else {
      setSelectedKey('1');
    }
  }, [location]);

  return (
    <Sider style={{ background: '#e3e3e3' }} collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className='size-28 w-full px-12'>
        <Image preview={false} src="https://uploads.turbologo.com/uploads/design/preview_image/1474061/preview_image20201021-12242-yijvzg.png" alt="logo" className='rounded-full' />
      </div>
      <Menu selectedKeys={[selectedKey]} mode="inline" className='bg-[#e3e3e3]'>
        <Menu.Item onClick={() => {router.push('/admin'); setSelectedKey('1')}} key="1" icon={<DesktopOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item onClick={() => {router.push('/admin/users'); setSelectedKey('2')}} key="2" icon={<UserOutlined />}>
          Users
        </Menu.Item>
        <Menu.Item onClick={() => {router.push('/admin/category'); setSelectedKey('3')}} key="3" icon={<ProductOutlined />}>
          Product Categories
        </Menu.Item>
        <Menu.Item onClick={() => {router.push('/admin/products'); setSelectedKey('4')}} key="4" icon={<ProductOutlined />}>
          Products
        </Menu.Item>
        <Menu.Item onClick={() => {localStorage.removeItem('token'); router.push('/') ;setSelectedKey('1')}} key="5" icon={<ProductOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;