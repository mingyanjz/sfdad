import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import car from "../assets/car1.png"
import drone from "../assets/drone1.png"
export default class History extends Component {

  render() {
    const orders = this.props.userHistory ? this.props.userHistory : [];
    console.log(orders );
    return (
      <div className="history">
        <div className="lander">
          {
            this.props.user ?
              <h1>{this.props.user.firstName} {this.props.user.lastName}'s order history</h1> :
              <h1>Login first to see history</h1>
          }
          <div className="history-list">
          <List 
            itemLayout="horizontal"
            dataSource={orders}
            renderItem={order => (
              <List.Item>
                <List.Item.Meta
                  avatar={ 
                  <Avatar className="order-avatar"
                  size={100}
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
          
        </div>
      </div>
    );
  }
}