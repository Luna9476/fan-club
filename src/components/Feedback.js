import React, { Component } from 'react'
import { Image, Button} from 'react-bootstrap';

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

function Feedback(props) {
    return (
        <div style = {feedbackStyle}>
          <Image src={props.image} className = "pb-4" roundedCircle = "true" style={{width: "30vh"}}/>
          <h3  style = {{marginBottom: "2rem"}}>{props.text}</h3>
          <div style = {rowButtonStyle}>
            <Button variant="primary" style={{marginRight:"2rem"}}>{props.primaryButtonText}</Button> 
            <Button variant="secondary" >{props.secondaryButtonText}</Button> 
          </div>
        </div>
    );
  }
  
export default Feedback;