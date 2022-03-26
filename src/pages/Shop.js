import React, { Component } from 'react'
import { Card, Form, Col, Row, Button} from 'react-bootstrap';

const shopStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
}

const checkOutBGStyle = {
    border:"1px solid rgb(10 10 10 / 13%)", 
    borderRadius:"0rem", 
    width:"100vw", 
    height:"15vh"
}
const checkOutElementStyle = {
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    marginRight:"2rem"
}

export default class Manage extends Component {
    render(){
        return(
            <div style={shopStyle}>
                <Card
                    style={{ width: '25vw' }}>
                <Card.Img variant="top" src="ticket.jpeg" />
                <Card.Body>
                    <Card.Title>Fan-Vote Ticket</Card.Title>
                    <Card.Text>
                    Buy the ticket to vote your idol
                    </Card.Text>
                    <Form>
                        <Form.Group as={Row} className="pt-3" >
                            <Form.Label column sm="7" className='font-weight-bold'>
                            Quantity:
                            </Form.Label>
                            <Col>
                            <Form.Control className="border border-dark text-center" type = "number" placeholder='1' style={{width:'45%' }}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
                </Card>
                <Card style={checkOutBGStyle}>
                    <div style = {{display:"flex", flexDirection:"row-reverse"}}>
                        <div style = {checkOutElementStyle}>
                            <Card.Text className = "pt-3" ><h5 style = {{marginBottom: "0rem"}}>Total Price: 3 ETH</h5></Card.Text>
                            <Card.Text>(Available Balance: 2 ETH)</Card.Text>
                            <Button variant="primary"> Checkout </Button>
                        </div>
                    </div>
                </Card>
            </div>
        )  
    }
}