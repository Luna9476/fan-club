import React, { Component } from 'react'
import Feedback from '../components/Feedback'

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
        image="refund.jpg"
        text="Refund Order Submitted"
        primaryButtonText="View on Etherscan"
        secondaryButtonText="Refund Again">
      </Feedback>
    )
  }
}