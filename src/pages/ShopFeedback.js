import React, { Component } from 'react'
import Feedback from '../components/Feedback';


function ShopFeedback(props) {
    return (
        <Feedback 
          image = "ticket.jpeg" 
          text = "Order Submitted" 
          primaryButtonText = "Shop Again"
          goBackLink = "/shop">
        </Feedback>
    );
  }
  
export default ShopFeedback;