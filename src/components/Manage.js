import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.css';
import {Button, FormControl } from "react-bootstrap";


export default class Manage extends Component {
    render() {
        return (
            <div style={{
                backgroundColor: "#ffde00",
                display: 'block',
                width: 700,
                // color: #00F,
                padding: 30
            }}>
                <h4>Post Your Idol's Information</h4>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="basic-addon1">Id</InputGroup.Text>
                    <FormControl
                        placeholder="Idol's Id"
                        aria-label="Idol's Id"
                        aria-describedby="Idol's Id"
                    />
                    
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="basic-addon2">Name</InputGroup.Text>
                    <FormControl
                        placeholder="Idol's Name"
                        aria-label="Idol's Name"
                        aria-describedby="Idol's Name"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        Avatar URL
                    </InputGroup.Text>
                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                </InputGroup>


                <InputGroup>
                    <InputGroup.Text>Introdution</InputGroup.Text>
                    <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>
                <br />

                <Button variant="primary" type="submit">
                    Click here to submit form
                </Button>


            </div>
        )
    }
}


// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

// export default function App() {
//     return (
//         <div style={{
//             display: 'block',
//             width: 700,
//             padding: 30
//         }}>
//             <h4>React-Bootstrap Form Component</h4>
//             <Form>
//                 <Form.Group>
//                     <Form.Text>Enter your full name:</Form.Text>
//                     <Form.Control type="text"
//                         placeholder="Enter your full name" />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Enter your email address:</Form.Label>
//                     <Form.Control type="email"
//                         placeholder="Enter your your email address" />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Enter your age:</Form.Label>
//                     <Form.Control type="number" placeholder="Enter your age" />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">
//                     Click here to submit form
//                 </Button>
//             </Form>
//         </div>
//     );
// }



