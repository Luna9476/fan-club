import React, { Component } from 'react'
import Feedback from '../components/Feedback';


function ShopFeedback(props) {
    return (
        <Feedback 
          image = "ticket.jpeg" 
          text = "Order Submitted" 
          primaryButtonText = "View on Etherscan"
          secondaryButtonText = "Shop Again">
        </Feedback>
    );
  }
  
export default ShopFeedback;