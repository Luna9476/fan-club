import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { Button, Container} from "react-bootstrap";


export default function Manage() {
    return (
        <Container className='form-border'>
            <h3>Post Idols</h3>
            <Form >
                <Form.Group className="mb-3 input-group input-group-outline" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"/>
                </Form.Group>

                <Form.Group className="mb-3 input-group input-group-outline" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Form.Group className="mb-3 input-group input-group-outline" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={() => {}}>
                    Submit
                </Button>
            </Form>
        </Container>

        // <div style={{
        //     display: 'block',
        //     width: 700,
        //     // color: #00F,
        //     padding: 30
        // }}>
        //     <InputGroup size="sm" className="mb-3">
        //         <InputGroup.Text id="basic-addon1">Id</InputGroup.Text>
        //         <FormControl
        //             placeholder="Idol's Id"
        //             aria-label="Idol's Id"
        //             aria-describedby="Idol's Id"
        //         />

        //     </InputGroup>

        //     <InputGroup size="sm" className="mb-3">
        //         <InputGroup.Text id="basic-addon2">Name</InputGroup.Text>
        //         <FormControl
        //             placeholder="Idol's Name"
        //             aria-label="Idol's Name"
        //             aria-describedby="Idol's Name"
        //         />
        //     </InputGroup>

        //     <InputGroup className="mb-3">
        //         <InputGroup.Text id="basic-addon3">
        //             Avatar URL
        //         </InputGroup.Text>
        //         <FormControl id="basic-url" aria-describedby="basic-addon3" />
        //     </InputGroup>


        //     <InputGroup>
        //         <InputGroup.Text>Introdution</InputGroup.Text>
        //         <FormControl as="textarea" aria-label="With textarea" />
        //     </InputGroup>
        //     <br />

        //     <Button variant="primary" type="submit">
        //         Click here to submit form
        //     </Button>


        // </div>
    )
}