import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Spin, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loginAction,
  selectLoading,
  selectMessage,
  selectLoggedIn,
} from '@kma-news/auth-slice';
import './LoginForm.css';
export const LoginForm = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedIn = useAppSelector(selectLoggedIn);
  const loading = useAppSelector(selectLoading);
  const errorMessage = useAppSelector(selectMessage);
  const onFinish = useCallback(
    (fields) => {
      const email = fields.email.trim(),
        password = fields.password.trim();
      if (!email.length && !password.length) return;
      dispatch(loginAction({ email, password }));
    },
    [dispatch]
  );
  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);
  return (
    <Spin size="large" spinning={loading === 'pending'}>
      {loading === 'error' && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Email không hợp lệ!',
              type: 'email',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email đăng nhập..."
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Mật khẩu không hợp lệ!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link className="login-form-forgot" to="/">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          {' Or '}
          <Link className="login-form-forgot" to="/">
            register now!
          </Link>
        </Form.Item>
      </Form>
    </Spin>
  );
});
