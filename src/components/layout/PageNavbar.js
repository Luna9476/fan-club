import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
import { FcLike } from "react-icons/fc";
import MetaMaskAuth from './MetaMaskAuth';
import { ethers } from 'ethers';



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

	async function isAdmin() {

	}


	return (
		<div>
			<Navbar>
				<Container>
					<Navbar.Brand href="/home"><FcLike size={20} /> Fans Club</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					
						<Nav className="justify-content-center">
							<Nav.Link href="/#chartdiv">Vote</Nav.Link>
							<Nav.Link href="/shop">Fan Shop</Nav.Link>
							{/* <Nav.Link href="/myaccount">My Account</Nav.Link> */}
							<Nav.Link href="/manage">Manage Idols</Nav.Link>
							{/* manage page should be replaced by publish page*/}
                            {admin?<Nav.Link href="publish">Publish</Nav.Link> : ""} 
						</Nav>
					
					<MetaMaskAuth setAdmin={setAdmin}/>

				</Container>
			</Navbar>
		</div>

	);
}

export default PageNavbar;