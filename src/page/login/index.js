import React from 'react';
import './index.css';
import Logol from './../../assets/img/login-logol.png';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit=(e)=> {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log('props:', this.props);
        this.props.history.replace('/');
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (<div className="login-con">
      <div className="logol"><img src={Logol} /></div>
      <div className="login">
        <h2>用户登录</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{required: true, message: '请输入用户名'}]
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(87,183,252,.9)'}} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem style={{marginBottom: '5px'}}>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码'}]
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(87,183,252,.9)'}} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox className="remember">记住账号</Checkbox>
            )}
            <a className="login-form-forgot remember forget" href="#/login">忘记密码?</a>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button btn-login">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>);
  }
}

export default Form.create()(Login);
