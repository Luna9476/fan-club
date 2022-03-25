import React, { Component } from 'react'
import { Card, Button, Form, Col, Row } from 'react-bootstrap';

export default class Manage extends Component {
    render(){
        return(
            <Card 
                style={{ width: '25rem' }}>
            <Card.Img variant="top" src="ticket.jpeg" />
            <Card.Body>
                <Card.Title>Fan-Vote Ticket</Card.Title>
                <Card.Text>
                Buy the ticket to vote your idol
                </Card.Text>
                <Form>
                    <Form.Group as={Row} className="pt-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="7">
                        <b>Quantity:</b>
                        </Form.Label>
                        <Col>
                        <Form.Control type = "number" placeholder='1' style={{width:'45%'}}/>
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
            </Card>
        )  
    }
}