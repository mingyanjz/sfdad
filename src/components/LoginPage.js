import React, { Component } from 'react';
import drone from '../assets/drone.png'
import LoginForm from './LoginForm'

export default class LoginPage extends Component {
    onFinish = values => {
        console.log('Success:', values);
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        
    };
    render() {
        
        return (
            <div className="Login">
                <div className="Login-box">
                 <LoginForm 
                    className="Login-form"
                    updatePage ={this.props.updatePage }
                    updateUser ={this.props.updateUser}
                    updateLogin={this.props.updateLogin}
                 />
                </div>
                <div className="background">
                    <img className="background-drone" src={drone}  alt="logo" width="1000" ></img>
                </div>
                
            </div>
        );
    }
}