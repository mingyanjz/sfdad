import React, { Component }  from 'react'
import {
  Form,
  Input,
  Button,
} from 'antd';

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  register = (data) => {
    //fetch('http://localhost:8080/dispatchApp/register', {
      fetch('http://18.191.48.223/dispatchDeliveryBackend/register', { 
      method: 'POST', // or 'PUT'
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      body: JSON.stringify(data),
      // credentials: 'include'
    })
    .then(data => {    
      console.log(data);
      if (data.status >= 400 && data.status < 600) {
        throw new Error("Bad response from server");
      }
      return data.json();
    })
    // .then(response=>response.text())
      .then(data => {
        console.log('Success:');
        console.log(data);
        this.props.updatePage("/login");
      })
      .catch((error) => {
        console.error('Register Failed:', error);
        alert("The email has been registered. Please log in or change the email!!");
        // console.error('Register Error:', JSON.stringify(data));
        // this.props.updatePage("/login");
      });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let data = {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        };
       
        this.register(data);   
        // this.props.updatePage("/login");
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
    const { autoCompleteResult } = this.state;

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
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="First Name" hasFeedback>
          {getFieldDecorator('firstName', {
            rules: [
              {
                required: true,
                message: 'Please input your First Name!',
              },    
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Last Name" hasFeedback>
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Please input your Last Name!',
              },    
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{width:'120px', background: "#009688", borderColor: "#009688" }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;
