import React, { Component, useState, useEffect } from 'react'
import { Card, Form, Col, Row, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Web3ABI from './Web3';
let w3 = new Web3ABI();

const shopStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
}

const checkOutBGStyle = {
    border:"1px solid rgb(10 10 10 / 13%)", 
    borderRadius:"0rem", 
    position: "fixed",
    bottom: "0px",
    left: "0px",
    right: "0px",
    width:"100vw", 
    height:"15vh"
}
const checkOutElementStyle = {
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    marginRight:"2rem"
}

function Shop() {
    const [balance, setBalance] = useState("-");
    const [ethBalance, setEthBalance] = useState("-"); 
    const [currentEther, setCurrentEther] = useState("0");
    async function getBalance() {
        const balance = await w3.GetBalanceInfo()
        setBalance(balance)
        console.log('Balance Info %s', balance)
    }
    async function getEthBalance() {
        const ethBalance = await w3.getEthBalanceOf()
        setEthBalance(ethBalance) 
        console.log('remaining eth balance %s', ethBalance)
    }
    
    useEffect(() => {
        getBalance();
        getEthBalance();
    }, [currentEther])
    const balanceInfo = balance.toString().split(',');
    const tokenPrice = balanceInfo[2]/10 ** 18;
    const totalPrice = tokenPrice * currentEther;

    async function handleClick() {
        var status = await w3.BuyTicket(totalPrice);
        console.log(status[0], status[1])
        if (status[0]){
            window.location.href = "/shopfeedback";
        } else {
            alert(status[1]);
        }
    }
    
    return(
        <div style={shopStyle}>
            <Card
                style={{ width: '25vw' }}>
            <Card.Img variant="top" src="ticket.jpeg" />
            <Card.Body>
                <Card.Title>Fan-Vote Ticket</Card.Title>
                <Card.Text>
                Token Price : {tokenPrice} Ether
                </Card.Text>
                <Form>
                    <Form.Group as={Row} className="pt-3" >
                        <Form.Label column sm="7" className='font-weight-bold'>
                        Quantity:
                        </Form.Label>
                        <Col>
                        <Form.Control className="border border-dark text-center" type = "number" placeholder='0' style={{width:'45%' }}
                            value={currentEther} onInput={e => setCurrentEther(e.target.value)}
                        />
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
            </Card>
            <Card style={checkOutBGStyle}>
                <div style = {{display:"flex", flexDirection:"row-reverse"}}>
                    <div style = {checkOutElementStyle}>
                        <Card.Title className='pt-2'>Total Price: {totalPrice} ETH</Card.Title>
                        <Card.Text>(Available Balance: {ethBalance} ETH)</Card.Text>
                        <Button variant="primary" onClick={handleClick}>
                            Check Out 
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )  
}
export default Shop;