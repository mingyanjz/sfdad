import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
} from 'antd';



class LoginForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  login = (data) => {
    //fetch('http://localhost:8080/dispatchApp/login', {
      fetch('http://18.191.48.223/dispatchDeliveryBackend/login', {    
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      body: JSON.stringify(data),
    })
    .then(data => {        
      if (data.status >= 400 && data.status < 600) {
        throw new Error("Bad response from server");
      }
      return data.json();
    })
      .then(data => {
        console.log('Success:', data);
        this.props.updateLogin(true);
        this.props.updateUser(data);
        this.props.updatePage("/");
      })
      .catch((error) => {
        console.error('Login Failed:', error);    
        alert("The email or password is incorrect!!");
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let user = {
          email: values.email,
          password: values.password,
        };
        this.login(user);
        // this.props.updateLogin(true);
        // this.props.updateUser(user);
        // this.props.updatePage("/");
      }
    });

  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };



    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{  width:'120px', background: "#009688", borderColor: "#009688" }}>
            Login
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'register' })(LoginForm);


export default WrappedLoginForm;