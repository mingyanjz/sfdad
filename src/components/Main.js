import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "../Routes";
import { LinkContainer } from "react-router-bootstrap";

import Order from './OrderComponents/Order';
import GMap from './MapComponents/GMap';

class Main extends Component {
    render() {
        return (
            <div className="main">
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
                <Routes />
            </div>
        );
    }
}

export default Main;