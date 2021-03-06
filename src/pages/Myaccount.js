import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import RefundConfirm from './RefundConfirm'
import { ethers } from 'ethers';
import { contractAddress, contractABI } from './Contract';

import Web3ABI from './Web3';
let w3 = new Web3ABI();

export default function Myaccount() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //get balance info
    const [balance, setBalance] = useState("-");
    const [currentEther, setCurrentEther] = useState("0");
    async function getBalance() {
        const balance = await w3.GetBalanceInfo()
        setBalance(balance)
        console.log('Balance Info %s', balance)
    }

    useEffect(() => {
        getBalance();
    }, [currentEther])
    const balanceInfo = balance.toString().split(',');
    const tokenPrice = balanceInfo[2] / 10 ** 18;
    const totalPrice = tokenPrice * currentEther;

    async function handleClick() {
        var status = await w3.RefundToken(totalPrice);
        console.log(status[0], status[1])
        if (status[0]) {
            window.location.href = "/refundconfirm";
        } else {
            alert(status[1]);
        }
    }

    //get transaction from promise
    const [transact, setTransact] = useState([])
    const getTransac = async () => {
        const transact = await w3.GetTransRecord()
        setTransact(transact[0])
        console.log('transac', transact)
    }
    useEffect(() => {
        getTransac()
    }, [])

    //get admin from promise
    const [isShow, setIsShow] = useState(false)
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        const Provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = Provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, contractABI, signer);
        Contract.isAdmin().then((admin) => {
            setAdmin(admin)
            console.log(admin, 123)
            setIsShow(true)
        })
        // console.log(await Contract.isAdmin())
        console.log(admin)
    }, [])

    return (
        <>{isShow &&
            <>{admin ?
                <div>
                    <Card border="primary" style={{ width: '60rem' }}>
                        {/* <Card.Header style={{ height: '2rem' }}></Card.Header> */}
                        <Card.Body>
                            <Card.Title>Deploy Information</Card.Title>
                            <br />
                            <ListGroup>
                                <ListGroup.Item variant="danger">
                                    <dl class="row">
                                        <dt class="col-sm-3">TotalToken</dt>
                                        <dd class="col-sm-9">{balanceInfo[0]}</dd>
                                    </dl>
                                </ListGroup.Item>
                                <ListGroup.Item variant="success">
                                    <dl class="row">
                                        <dt class="col-sm-3">TokenPrice (Ether/Token)</dt>
                                        <dd class="col-sm-9">{balanceInfo[1] / 10 ** 18}</dd>
                                    </dl>
                                </ListGroup.Item>
                                <ListGroup.Item variant="warning">
                                    <dl class="row">
                                        <dt class="col-sm-3 text-truncate">TokenBalance</dt>
                                        <dd class="col-sm-9">{balanceInfo[2]}</dd>
                                    </dl>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div> :
                <div>
                    <Card border="primary" style={{ width: '30rem' }}>
                        <Card.Header style={{ height: '2rem' }}>Account Balance</Card.Header>
                        <Card.Body>
                            <Card.Title>{balanceInfo[0]} Token</Card.Title>
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
                                            <Form.Control type="number" placeholder="Input Account" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                value={currentEther} onInput={e => setCurrentEther(e.target.value)} />
                                            <br />
                                            <Form.Text className="text-muted">
                                                Available Refunds(Votes):{balanceInfo[0]}
                                            </Form.Text>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleClick}>
                                        Confirm
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
                                <th>TransType</th>
                                <th>Time</th>
                                <th>TransAmount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transact.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3].toString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            }</>
        }</>
    )


}


