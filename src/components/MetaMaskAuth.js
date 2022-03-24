// import React, { useEffect, useState } from "react";
// import { Navbar, Container, Nav, Button, Form, Modal, Row, Col } from 'react-bootstrap';
// import { BsFillHeartFill, BsPersonCircle } from "react-icons/bs";
// import { BiLinkExternal } from "react-icons/bi"
// import { ethers } from 'ethers';

// // import Club from '../artifacts/contracts/Club.sol/Club.json'




// export default function MetaMaskAuth({setAdmin}) {
//     const [userAddress, setUserAddress] = useState("");
//     const [showModal, setShowModal] = useState(false)

//     const handleClose = () => {
//         setShowModal(false);
//     }

//     const disconnect = () => {
//         setShowModal(false);
//         setUserAddress("")
//     }

//     window.ethereum.on('accountsChanged', (accounts) => {
//         setUserAddress(accounts[0])
//     });

//     const connect = async (onConnected) => {
//         if (!window.ethereum) {
//             alert("Get MetaMask!");
//             return;
//         }

//         const accounts = await window.ethereum.request({
//             method: "eth_requestAccounts",
//         });
//         onConnected(accounts[0]);
//         console.log(userAddress)

//         const provider = new ethers.providers.Web3Provider(window.ethereum)
//         const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Club.abi, provider)
//         const isAdmin = await contract.isAdmin()
//         setAdmin(isAdmin)

//     }

//     return (
//         userAddress ? (
//             <>
//                 <Form className="d-flex">
//                     <Button onClick={() => setShowModal(true)}>
//                         Connected with <Address userAddress={userAddress} />
//                     </Button>
//                     <Nav.Link><BsPersonCircle className='fa-2x  primary' />My Account</Nav.Link>
//                 </Form>


//                 <Modal show={showModal} onHide={handleClose}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Account</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Container>
//                             <Row>
//                                 <Col>Connected with MetaMask</Col>
//                                 <Col className="float-end"><Button variant="outline-primary" size="sm" onClick={disconnect} className="float-end">
//                                     Disconnect
//                                 </Button></Col>
//                             </Row>
//                             <Row>
//                                 <Col md="auto"><BsPersonCircle size={70} /></Col>
//                                 <Col><Address userAddress={userAddress} /></Col>
//                             </Row>
//                             <Row>
//                                 <Col><a href={"https://etherscan.io/address/" + userAddress}><BiLinkExternal />view</a></Col>


//                             </Row>
//                         </Container>
//                         <Modal.Footer>
//                             <Button variant="primary" onClick={handleClose}>
//                                 Close
//                             </Button>
//                         </Modal.Footer>
//                     </Modal.Body>
//                 </Modal>
//             </>


//         ) : (

//             <Form >
//                 <Button onClick={() => connect(setUserAddress)}>Connect Wallet</Button>
//             </Form>

//         )
//     );





// }

// function Address({ userAddress }) {
//     return (
//         <span>{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>
//     );
// }
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { BsFillHeartFill, BsPersonCircle } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi"

async function connect(onConnected) {
    if (!window.ethereum) {
        alert("Get MetaMask!");
        return;
    }

    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });

    onConnected(accounts[0]);
}


export default function MetaMaskAuth() {
    const [userAddress, setUserAddress] = useState("");
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => {
        setShowModal(false);
    }

    const disconnect = () => {
        setShowModal(false);
        setUserAddress("")
    }

    window.ethereum.on('accountsChanged', (accounts) => {
        setUserAddress(accounts[0])
    });


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