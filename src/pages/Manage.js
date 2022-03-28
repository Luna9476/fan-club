import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { Button, Container } from "react-bootstrap";

//add web3ABI
import Web3ABI from './Web3';

let w3 = new Web3ABI();
export default class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            introduction: '',
            avatarURL: '',
            votes: 100
        };
        this.handleName = this.handleName.bind(this);
        this.handleIntro = this.handleIntro.bind(this);
        this.handleURL = this.handleURL.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(event) {
        this.setState({ name: event.target.value }); //get value from the form
    }
    handleIntro(event) {
        this.setState({ introduction: event.target.value });
    }
    handleURL(event) {
        this.setState({ avatarURL: event.target.value });
    }

    handleSubmit(event) {
        console.log(this.state)
        event.preventDefault();
        w3.PublishStar(this.state)             
    }

    render() {
        return (
            <Container className='form-border'>
                <h3>Post Idols</h3>
                <Web3ABI />
                <h3>Post Idols000000000</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3 input-group input-group-outline" controlId="formBasicName">
                        <Form.Control type="text" placeholder="Idol's Name" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.name} onChange={this.handleName} />
                    </Form.Group>

                    <Form.Group className="mb-3 input-group input-group-outline" controlId="formBasicAvatar">
                        <Form.Control type="url" placeholder="Avatar URL" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.avatarURL} onChange={this.handleURL} />
                    </Form.Group>

                    <Form.Group className="mb-3 input-group input-group-outline" controlId="formBasicAvatar">
                        <Form.Control as="textarea" placeholder="Introduction" aria-label="With textarea" aria-describedby="basic-addon2" value={this.introduction} onChange={this.handleIntro} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={() => { }}>
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}

