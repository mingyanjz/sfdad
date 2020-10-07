import React, { Component } from 'react';

import Order from './OrderComponents/Order';

export default class HomePage extends Component{
  
    render(){
        return (
            <div className="Home">
              <div className="lander">
                <Order 
                  user={this.props.user}
                  logout={this.props.logout}
                  onClickUser={this.props.onClickUser}
                />
              </div>
            </div>
          );
    }
  }