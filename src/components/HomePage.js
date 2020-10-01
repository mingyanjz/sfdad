import React, { Component } from 'react';

import Order from './OrderComponents/Order';
import GMap from './MapComponents/GMap';

export default class HomePage extends Component{
    render(){
        return (
            <div className="Hhome">
              <div className="lander">
                    <Order />
                    <GMap />
              </div>
            </div>
          );
    }
  }