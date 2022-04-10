import React, { useEffect, useState, Component } from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import { Button, Container } from "react-bootstrap";

//add web3ABI
import Web3ABI from './Web3';
let w3 = new Web3ABI();

export default class Manage extends Component {
    componentDidMount() {
        const getStar = async () => {
            var stars = await w3.GetStars1();
            let starRes = stars[0];
            this.setState({ stars: starRes })
        }
        getStar();
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            introduction: '',
            avatarURL: '',
            votes: '',
            show: false,
            stars: []
        };

        this.handleName = this.handleName.bind(this);
        this.handleIntro = this.handleIntro.bind(this);
        this.handleURL = this.handleURL.bind(this);
        this.handleVotes = this.handleVotes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
    handleVotes(event) {
        this.setState({ votes: event.target.value });
    }

    async handleSubmit(event) {
        console.log(this.state)
        event.preventDefault();
        await w3.PublishStar(this.state.name, this.state.introduction, this.state.avatarURL, this.state.votes)          
    }

    handleShow = () => {
        this.setState({ show: true });
    };
    handleClose = () => {
        this.setState({ show: false });
        window.location.href = "/manage";
    };



    render() {
        // const { stars } = this.state
        return (
            <Container className='form-border'>
                {/* <Web3ABI /> */}
                <h3>Idols' Information</h3>
                <Button variant="primary" onClick={this.handleShow}>
                    Post New Idols
                </Button>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Idol's Name</th>
                            <th>Introduction</th>
                            <th>Current Votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.stars.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                                <td>{item.votes.toString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Post New Idols</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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

                            <Form.Group className="mb-3 input-group input-group-outline" controlId="formBasicName">
                                <Form.Control type="text" placeholder="Votes" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.name} onChange={this.handleVotes} />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={() => { }}>
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        {/* <Button variant="primary" type="submit" onClick={() => { }}>
                            Submit
                        </Button> */}
                    </Modal.Footer>
                </Modal>


            </Container>
        )
    }
}

