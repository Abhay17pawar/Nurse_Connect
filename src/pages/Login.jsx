import React from 'react';
import {useState} from 'react';
import { Button, Form, Input, Radio} from 'antd';
import { FaHeartPulse } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import "../pages/Signup.css"; 

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => {
  const [nurse, setNurse] = useState(false)
  return (
  <div className="container">
    <img 
      className="img" 
      src="https://www.corbinhrc.com/hrc-content/uploads/2019/11/iStock-1029340354-e1574429850398.jpg" 
      alt="Login Background" 
    />
    <div className='form'>
    <h1 className="nurseConnect-heading">
        NurseConnect
        <FaHeartPulse className="icon" />
      </h1>
      <h2>Login</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="button" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Link className="toSignup" to="/Signup">new to NurseConnect?</Link>

      </Form>
    </div>
  </div>
  )}


export default Login;
