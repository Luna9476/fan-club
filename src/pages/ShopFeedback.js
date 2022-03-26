import React, { Component } from 'react'
import { Image, Button} from 'react-bootstrap';
import Feedback from '../components/Feedback';

const feedbackStyle = {
  display:"flex",
  flexDirection:"column",
  justifyContent:"flex-start",
  alignItems:"center"
}
const rowButtonStyle = {
  display:"flex",
  flexDirection:"row",
}

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