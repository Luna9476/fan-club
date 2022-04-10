import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    function goBack(){
        window.location.href = props.goBackLink;
    }
    return (
        <div style = {feedbackStyle}>
            <Image src={props.image} className = "pb-4" roundedCircle = "true" style={{width: "30vh"}}/>
            <h3  style = {{marginBottom: "2rem"}}>{props.text}</h3>
            <div style = {rowButtonStyle}>
                <Button onClick = {goBack} variant="primary" style={{marginRight:"2rem"}}>{props.primaryButtonText}</Button> 
            </div>
        </div>
    );
}
  
export default Feedback;