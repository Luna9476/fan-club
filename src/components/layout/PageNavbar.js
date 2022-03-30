import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
import { FcLike } from "react-icons/fc";
import MetaMaskAuth from './MetaMaskAuth';
import { ethers } from 'ethers';


const navTitle = {
	fontSize: "18px"
}
const navBrand = {
	display: "flex",
	alignItems: "baseline"
}

function PageNavbar() {
	const [errorMessage, setErrorMessage] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [admin, setAdmin] = useState(false)

	
	const getAccountBalance = (account) => {
		window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
			.then(balance => {
				setUserBalance(ethers.utils.formatEther(balance));
			})
			.catch(error => {
				setErrorMessage(error.message);
			});
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

	window.ethereum.on('chainChanged', chainChangedHandler);



	return (
		<div>
			<Navbar fixed="top">
				<Container>
					<Navbar.Brand style={navBrand} href="/home"><FcLike size={28} /><h3 className="header-font">  Fans Club</h3></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					<Nav className="justify-content-center">
						<Nav.Link href="/#chartdiv"><div style={navTitle}>Vote</div></Nav.Link>
						<Nav.Link href="/shop"><div style={navTitle}>Fan Shop</div></Nav.Link>
						{/* <Nav.Link href="/manage"><div style={navTitle}>Manage Idols</div></Nav.Link> */}
						{/* manage page should be replaced by publish page*/}
						{admin ? <Nav.Link href="/manage"><div style={navTitle}>Manage Idols</div></Nav.Link> : ""}
					</Nav>

					<MetaMaskAuth setAdmin={setAdmin}/>

				</Container>
			</Navbar>
		</div>

	);
}

export default PageNavbar;