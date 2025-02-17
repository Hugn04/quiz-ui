import { Layout, Menu, Input, Avatar, Dropdown, Space, Typography, Button, Badge } from 'antd';
import { UserOutlined, SearchOutlined, LogoutOutlined, SettingOutlined, MessageOutlined } from '@ant-design/icons';
import logo from '../../assets/react.svg';
const { Header } = Layout;
const { Text } = Typography;
type headerType = {
    showDrawer: () => any;
};
// Navbar menu
const menuItems = [
    { key: '1', label: 'Trang chủ' },
    { key: '2', label: 'Sản phẩm' },
    { key: '3', label: 'Liên hệ' },
];

// Dropdown menu
const userMenu = {
    items: [
        { key: '1', icon: <SettingOutlined />, label: 'Cài đặt' },
        { key: '2', icon: <LogoutOutlined />, label: 'Đăng xuất' },
    ],
};

const AppHeader = ({ showDrawer }: headerType) => {
    return (
        <Header style={{ display: 'flex', alignItems: 'center', padding: '0 20px', background: '#001529' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
                <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>MyApp</Text>
            </div>

            {/* Navbar */}
            <Menu theme="dark" mode="horizontal" items={menuItems} style={{ flex: 1, minWidth: 0 }} />

            {/* Thanh tìm kiếm */}
            <Input placeholder="Tìm kiếm..." prefix={<SearchOutlined />} style={{ width: 250, marginRight: 20 }} />
            <Space style={{ marginRight: 20 }}>
                <Badge count={5}>
                    <Button
                        shape="circle"
                        type="primary"
                        onClick={showDrawer}
                        icon={<MessageOutlined />}
                        size={'large'}
                    />
                </Badge>
            </Space>
            {/* Avatar + Tên người dùng */}
            <Dropdown menu={userMenu} trigger={['click']}>
                <Space style={{ cursor: 'pointer', color: 'white' }}>
                    <Avatar size="large" icon={<UserOutlined />} />
                    <Text style={{ color: 'white' }}>Nguyễn Văn Adấdasdsadsa</Text>
                </Space>
            </Dropdown>
        </Header>
    );
};

export default AppHeader;
