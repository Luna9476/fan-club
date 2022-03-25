import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { Button, Container } from "react-bootstrap";


export default function Manage() {
    return (
        <Container className='form-border'>
            <h3>Post Idols</h3>
            <Form >
                <Form.Group className="mb-3 input-group input-group-outline" controlId="formBasicName">
                    <Form.Control type="text" placeholder="Idol's Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                </Form.Group>

                <Form.Group className="mb-3 input-group input-group-outline" controlId="formBasicAvatar">
                    <Form.Control type="url" placeholder="Avatar URL" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                </Form.Group>

                <Form.Group className="mb-3 input-group input-group-outline" controlId="formBasicAvatar">
                    <Form.Control as="textarea" placeholder="Introduction" aria-label="With textarea" aria-describedby="basic-addon2" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => { }}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}