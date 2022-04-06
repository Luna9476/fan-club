import React, { Component } from 'react'
import Feedback from '../components/Feedback';


function VoteFeedback(props) {
    return (
        <Feedback 
          image = "ticket.jpeg" 
          text = "Thank you for voting!" 
          primaryButtonText = "View on Etherscan"
          secondaryButtonText = "Vote Again">
        </Feedback>
    );
  }
  
export default VoteFeedback;