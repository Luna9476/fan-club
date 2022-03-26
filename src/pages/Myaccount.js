import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import RefundConfirm from './RefundConfirm'

export default function Myaccount() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Container className='form-border'>
            <Card border="primary" style={{ width: '15rem' }}>
                <Card.Header style={{ height: '2rem' }}>Account Balance</Card.Header>
                <Card.Body>
                    <Card.Title>1248 Ether</Card.Title>
                    <Button variant="primary" onClick={handleShow}>
                        Refund
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Refund</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3 input-group input-group-outline" controlId="formBasicName">
                                    <Form.Control type="number" placeholder="Input Account" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <Form.Text className="text-muted">
                                        Available Refunds(Votes): 1223
                                    </Form.Text>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleShow}>
                                <Link to="/refundconfirm">Confirm</Link>
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>FanAddress</th>
                        <th>TransType</th>
                        <th>Time</th>
                        <th>TransAmount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>aa</td>
                        <td>Vote</td>
                        <td>2022/3/24</td>
                        <td>23</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>bb</td>
                        <td>Buy</td>
                        <td>2022/3/24</td>
                        <td>56</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>cc</td>
                        <td>Buy</td>
                        <td>2022/3/24</td>
                        <td>77</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>dd</td>
                        <td>Refund</td>
                        <td>2022/3/24</td>
                        <td>46</td>
                    </tr>

                </tbody>
            </Table>
        </Container>
    )
}


