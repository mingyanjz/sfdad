import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "../Routes";
import { LinkContainer } from "react-router-bootstrap";

import Order from './OrderComponents/Order';
import GMap from './MapComponents/GMap';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            login: false,
            user: null,
        }
    }
    updateLogin = (value) => {
        this.setState({
            login: value,
        });
    }
    updateUser = (user) => {
        this.setState({
            user: user,
        });
        console.log('Update User: ', user);
    }
    logout = () => {
        fetch('http://localhost:8080/dispatchApp/logout', {
            method: 'POST', // or 'PUT'
            headers: {
                'Origin': 'http://localhost:3000',
              },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Logout Success:',data);
                this.updateLogin(false);
                this.setState({
                    user: null,
                });

            })
            .catch((error) => {
                console.error('Logout Error:', error);
                this.updateLogin(false);
                this.setState({
                    user: null,
                });
            });
        // this.updateLogin(false);
        // this.setState({
        //     user: null,
        // });

    }
    render() {
        return (
            <div className="main">
                {this.state.login == false ?
                    <Navbar fluid collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">Home</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight>
                                <LinkContainer to="/register">
                                    <NavItem>Register</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <NavItem>Login</NavItem>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    :
                    <Navbar fluid collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">Home</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight>
                                <LinkContainer to="/history">
                                    <NavItem>User</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <NavItem onClick={this.logout}>Logout</NavItem>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                }
                <Routes
                    updateLogin={this.updateLogin}
                    updateUser={this.updateUser}
                />
            </div>
        );
    }
}

export default Main;