import React, { Component } from 'react'
import Feedback from 'react-bootstrap/esm/Feedback'

const feedbackStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center"
}
const rowButtonStyle = {
  display: "flex",
  flexDirection: "row",
}

export default class RefundConfirm extends Component {
  render() {
    return (
      <Feedback
        image="ticket.jpeg"
        text="Order Submitted"
        primaryButtonText="View on Etherscan"
        secondaryButtonText="Shop Again">
      </Feedback>
    )
  }
}
// function RefundConfirm(props) {
//   return (
//       <Feedback 
//         image = "ticket.jpeg" 
//         text = "Refund Submitted" 
//         primarybuttontext = "View on Etherscan"
//         secondarybuttontext = "Shop Again">
//       </Feedback>
//   );
// }

// export default RefundConfirm;