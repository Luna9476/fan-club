import contract from "../artifacts/contracts/Club.sol/Club.json" 

const contractABI = contract.abi;
//contract address
const contractAddress =  process.env.REACT_APP_CONTRACT_ADDRESS;

export {
	contractAddress, contractABI
};