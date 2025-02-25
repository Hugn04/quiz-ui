import { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { login } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const { Title, Text } = Typography;

const Login = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector((state: RootState) => state.user.isLoading);
    const error = useSelector((state: RootState) => state.user.isError);
    const user = useSelector((state: RootState) => state.user.user);
    const navigator = useNavigate();
    useEffect(() => {
        if (error) {
            message.error('Tên tài khoản hoặc mật khẩu không chính xác');
        }
        if (user) {
            message.success('Đăng nhập thành công');
            navigator('/');
        }
    }, [error, user]);
    const onFinish = (values: { username: string; password: string }) => {
        dispatch(login({ username: values.username, password: values.password }));
        // setTimeout(() => {
        //     setLoading(false);
        //
        //     console.log('Đăng nhập với:', values);
        // }, 1500);
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
            <Card style={{ width: 400, padding: 20, borderRadius: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>
                    Đăng Nhập
                </Title>
                <Form name="login_form" onFinish={onFinish} layout="vertical">
                    {/* Email */}
                    <Form.Item
                        name="username"
                        label="Tên tài khoản"
                        rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản !' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Nhập tên tài khoản" />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu..." />
                    </Form.Item>

                    {/* Quên mật khẩu */}
                    <Form.Item>
                        <Text type="secondary" style={{ float: 'right', cursor: 'pointer' }}>
                            Quên mật khẩu?
                        </Text>
                    </Form.Item>

                    {/* Button Đăng nhập */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    {/* Đăng ký */}
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Text>
                            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                        </Text>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
