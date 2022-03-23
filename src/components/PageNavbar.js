import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
import { BsFillHeartFill, BsPersonCircle } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import MetaMaskAuth from './MetaMaskAuth';
import { ethers } from 'ethers';






function PageNavbar({ onAddressChanged }) {
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	async function requestAccount() {
		await window.ethereum.request({ method: 'eth_requestAccounts' })
	}

	async function connect() {
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount()
		}
	}

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts' })
				.then(result => {
					accountChangedHandler(result[0]);
					setConnButtonText('Wallet Connected');
					getAccountBalance(result[0]);
					console.log("connect")
				})
				.catch(error => {
					setErrorMessage(error.message);

				});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

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


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	return (
		<div>
			<Navbar>
				<Container>
					<Navbar.Brand href="/home"><FcLike size={20} /> Fans Club</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					
						<Nav className="justify-content-center">
							<Nav.Link href="/#chartdiv">Vote</Nav.Link>
							<Nav.Link href="#shop">Fan Shop</Nav.Link>
							<Nav.Link href="/manage">Manage Idols</Nav.Link>
						</Nav>
					
					<MetaMaskAuth />

				</Container>
			</Navbar>
		</div>
		

	);
}

export default PageNavbar;