import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Register = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = (values: { fullname: string; email: string; password: string }) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            message.success('Đăng ký thành công!');
            console.log('Thông tin đăng ký:', values);
        }, 1500);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5',
            }}
        >
            <Card style={{ width: 400, padding: 30, borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>
                    Đăng Ký
                </Title>
                <Form name="register_form" onFinish={onFinish} layout="vertical" size="large">
                    {/* Họ tên */}
                    <Form.Item
                        name="fullname"
                        label="Họ và Tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Nhập họ tên..." />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Nhập email..." />
                    </Form.Item>

                    {/* Mật khẩu */}
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            { min: 6, message: 'Mật khẩu ít nhất 6 ký tự!' },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu..." />
                    </Form.Item>

                    {/* Xác nhận mật khẩu */}
                    <Form.Item
                        name="confirm"
                        label="Xác nhận mật khẩu"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu..." />
                    </Form.Item>

                    {/* Button Đăng ký */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                            Đăng ký
                        </Button>
                    </Form.Item>

                    {/* Chuyển sang Đăng nhập */}
                    <div style={{ textAlign: 'center' }}>
                        <Text style={{ fontSize: 16 }}>
                            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                        </Text>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
