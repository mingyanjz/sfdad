import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "../Routes";
import { LinkContainer } from "react-router-bootstrap";



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
        // fetch('http://localhost:8080/dispatchApp/logout', {
        fetch('http://18.191.48.223/dispatchDeliveryBackend/Login/logout', {
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
    getHistory = (data) => {
        // data= {
        //     email: '5@gmail.com',
        //   };
        //fetch('http://localhost:8080/dispatchApp/login', {
          fetch('http://18.191.48.223/dispatchDeliveryBackend/Login/history/user', {    
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
            this.setState({
                userHistory: data,
            });
            console.log('History:', data);    
          })
          .catch((error) => {
            console.error('History Failed:', error);    
            alert("The email or password is incorrect!!");
          });
    }
    onClickUser = () => {
        this.getHistory(this.state.user)
        
    }
    render() {
        return (
            <div className="main">
                {this.state.login == false ?
                    <Navbar fluid collapseOnSelect>
                        {/* <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">Home</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header> */}
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
                    // <Navbar fluid collapseOnSelect>
                    //     {/* <Navbar.Header>
                    //         <Navbar.Brand>
                    //             <Link to="/">Home</Link>
                    //         </Navbar.Brand>
                    //         <Navbar.Toggle />
                    //     </Navbar.Header> */}
                    //     <Navbar.Collapse>
                    //         <Nav pullRight>
                    //             <LinkContainer to="/history">
                    //                 <NavItem onClick={this.onClickUser}>User</NavItem>
                    //             </LinkContainer>
                    //             <LinkContainer to="/login">
                    //                 <NavItem onClick={this.logout}>Logout</NavItem>
                    //             </LinkContainer>
                    //         </Nav>
                    //     </Navbar.Collapse>
                    // </Navbar>
                    <div></div>
                }
                <Routes
                    updateLogin={this.updateLogin}
                    updateUser={this.updateUser}
                    user={this.state.user}
                    userHistory={this.state.userHistory}
                    onClickUser={this.onClickUser}
                    logout={this.logout}
                />
            </div>
        );
    }
}

export default Main;