import React, { useEffect, useState } from "react";
import { Container, Nav, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { BsPersonCircle } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi"
import { ethers } from 'ethers';

import { contractAddress, contractABI } from "../../pages/Contract"

const useAccountEffect = (func, deps) => {
    const mounted = React.useRef(false);
    useEffect(() => {
        if (mounted.current) {
            func();
        } else {
            mounted.current = true;
        }
    }, [deps, func])
}

export default function MetaMaskAuth({ setAdmin }) {
    const [userAddress, setUserAddress] = useState("");
    const [showModal, setShowModal] = useState(false)


	useEffect(() => {
		const loggedinUser = localStorage.getItem("user")
		if (loggedinUser) {
			const foundUser = JSON.parse(loggedinUser)
			setUserAddress(foundUser)
		}
	}, []);

    const handleClose = () => {
        setShowModal(false);
    }

    const disconnect = () => {
        setShowModal(false);
        setUserAddress("");
        localStorage.removeItem("user");
        window.location.href="/home";
    }

    /**
     * Each time we change the user address, check whether the new address is admin or not
     */
    useAccountEffect(async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const Contract = new ethers.Contract(contractAddress, contractABI, signer);
        Contract.isAdmin().then((admin) => {
            setAdmin(admin)
        });
    }, [setUserAddress]);

    /**
     * If the metamask account changes
     */
    window.ethereum.on('accountsChanged', (accounts) => {
        setUserAddress(accounts[0])
    });

 
    const connect = async (onConnected) => {
        if (!window.ethereum) {
            alert("Get MetaMask!");
            return;
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        onConnected(accounts[0]);
        localStorage.setItem("user", JSON.stringify(accounts[0]))
    }

    
    return (
        userAddress ? (
            <>
                <Form className="d-flex">
                    <Button onClick={() => setShowModal(true)}>
                        Connected with <Address userAddress={userAddress} />
                    </Button>
                    <Nav.Link href="/myaccount"><BsPersonCircle className='fa-2x  primary' />My Account</Nav.Link>
                </Form>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>Connected with MetaMask</Col>
                                <Col className="float-end"><Button variant="outline-primary" size="sm" onClick={disconnect} className="float-end">
                                    Disconnect
                                </Button></Col>
                            </Row>
                            <Row>
                                <Col md="auto"><BsPersonCircle size={70} /></Col>
                                <Col><Address userAddress={userAddress} /></Col>
                            </Row>
                            <Row>
                                <Col><a href={"https://etherscan.io/address/" + userAddress}><BiLinkExternal />view</a></Col>


                            </Row>
                        </Container>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>
            </>


        ) : (

            <Form >
                <Button onClick={() => connect(setUserAddress)}>Connect Wallet</Button>
            </Form>

        )
    );





}

function Address({ userAddress }) {
    return (
        <span>{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>
    );
}


