import React, { Component } from 'react'
import Feedback from '../components/Feedback';


function VoteFeedback(props) {
    return (
        <Feedback 
          image = "ticket.jpeg" 
          text = "Thank you for voting!" 
          primaryButtonText = "Vote Again"
          goBackLink = "/home">
        </Feedback>
    );
  }
  
export default VoteFeedback;