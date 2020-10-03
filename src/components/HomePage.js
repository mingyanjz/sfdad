import React, { Component } from 'react';

import Order from './OrderComponents/Order';

export default class HomePage extends Component{
  
    render(){
        return (
            <div className="Hhome">
              <div className="lander">
                    <Order />
              </div>
            </div>
          );
    }
  }