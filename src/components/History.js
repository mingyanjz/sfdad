import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { Button } from 'antd';
import car from "../assets/car2.png"
import drone from "../assets/drone2.png"
import { Link } from "react-router-dom";
export default class History extends Component {

  render() {
    const orders = this.props.userHistory ? this.props.userHistory : [];
    console.log(orders );
    return (
      <div className="history">
        <div className="lander">
          {
            this.props.user ?
                <h1>Your order history</h1>
              :
                <h1>Login first to see history</h1>
          }
          <div className="history-box">
          <List className="history-list"
            itemLayout="horizontal"
            dataSource={orders}
            renderItem={order => (
              <List.Item>
                <List.Item.Meta
                  avatar={ 
                  <Avatar className="order-avatar"
                  size={120}
                  shape="square"
                  src={order['Carrier Type'] === "DRONE" ? drone : car}
               />}
                  title={
                    <div>
                      <div>Order Id: {order['Order Id']}</div>
                      <div>Status: {order['Status']}</div>
                      </div>}
                  description={
                  <div>
                    <div>{"Carrier Type: " + order['Carrier Type'] }</div>
                  <div>{"From: " + order['From'] }</div>
                  <div>{"To: " + order['To'] }</div>
                  </div>
                  }
                  
                />
              </List.Item>
            )}
          />
          </div> 
          {this.props.user && 
            <Link to='/'>
              <Button size='large' style={{fontSize: 16, margin:'25px', width:'250px'}} >
                Go Back
              </Button>
            </Link>
          }
        </div> 
      </div>
    );
  }
}