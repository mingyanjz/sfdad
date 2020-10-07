import React, { Component } from 'react';
import drone from '../assets/drone.png';
import RegisterForm from './RegisterForm';

export default class RegisterPage extends Component {
    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return (
            <div className="Register">
            
                <div className="Login-box">
                 <RegisterForm 
                    className="Login-form"
                    updatePage ={this.props.updatePage}
                />
                </div>
                <div className="background">
                    <img className="background-drone" src={drone}  alt="logo" width="1000" ></img>
                </div>
                
            </div>
        );
    }
}