import React, { Component, useState } from 'react'
import Pool from '../components/Pool';
import { Modal, Form, Button, CloseButton, Row, Col } from 'react-bootstrap';
import StarCarousel from '../components/StarCarousel';
import HeartButton from '../components/HeartButton';
import Web3ABI from './Web3';
let w3 = new Web3ABI();

const homeStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
}
const closeButtonStyle = {
    background: 'transparent url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23000%27%3e%3cpath d=%27M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z%27/%3e%3c/svg%3e") center/1em auto no-repeat'
}
export default function Home() {
    const [show, setShow] = useState(false);
    const [stars, setStars] = useState([]); 
    const [vote, setVote] = useState("0"); 
    const [id, setId] = useState("-");   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var status = ["", ""];


    async function handleSubmit() {
        console.log("id", id);
        console.log("vote", vote);
        status = await w3.VoteStars(id, vote);
        console.log(status[0], status[1])
        if (status[0] === true){
            window.location.href = "/votefeedback";
        } else if (status[0] === false) {
            alert(status[1]);
        }
    }
    return (
        <div style = {homeStyle}>
            <StarCarousel />
            <Pool star = {stars} onSetStar={setStars}/>
            <HeartButton onClick={handleShow}/>
            <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Vote your idol</Modal.Title>
                            <CloseButton style = {closeButtonStyle} onClick = {handleClose}/>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group as={Row} className="p-3">
                                    <Form.Label column className='font-weight-bold'>
                                        Idol :
                                    </Form.Label>
                                    <Col>
                                        <Form.Select onChange={e => setId(e.target.value)} aria-label="Default select example" className = "border border-dark text-center">
                                            <option>Choose your idol</option>
                                            {stars.map(star => (
                                                <option key={star.id} value={star.id}>{star.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="p-3">
                                    <Form.Label column className='font-weight-bold'>
                                        Vote Quantity :
                                    </Form.Label>
                                    <Col>
                                        <Form.Control className="border border-dark text-center" type = "number" placeholder='0'
                                            value={vote} onInput={e => setVote(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleSubmit}>
                                Vote
                            </Button>
                        </Modal.Footer>
            </Modal>
            <div></div>
        </div>
    )
}