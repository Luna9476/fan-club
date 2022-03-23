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