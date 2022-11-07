import React, { Component } from 'react';
import request from '../../request';
import qs from 'qs';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Navigate } from 'react-router-dom';
import './style.css';

class WrappedLoginForm extends Component {
  state = {
    isLogin: false,
  };

  onFinish = (values: any) => {
    request
      .post('/api/login', qs.stringify({ password: values.password }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then((res) => {
        const data: responseResult.login = res.data;
        if (data) {
          this.setState({
            isLogin: true,
          });
        } else {
          message.error('登录失败');
        }
      });
  };

  render() {
    const { isLogin } = this.state;
    return isLogin ? (
      <Navigate to="/" />
    ) : (
      <div className="login-page">
        <Form className="login-form" onFinish={this.onFinish}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入登录密码' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default WrappedLoginForm;
