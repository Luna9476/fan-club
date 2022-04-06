
import React from "react";
import Web3 from "web3";
//eth
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./Contract"



class Web3ABI extends React.Component{
    //stat
    constructor(){
        super();
        this.addressETH =  "";
        this.publicStars = [];
        this.transRecord = [];
    }

    //check metamask
    async checkMetamask() {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Please install Metamask");
        }
        console.log("metamask ok");
    }

    //provider
    Provider() {
        return new ethers.providers.Web3Provider(window.ethereum);
    }

    //contract
    async Contract() {
        const Provider = this.Provider();
        const signer = Provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, contractABI, signer);
        const addressETH = await this.Provider().send("eth_requestAccounts", []);
        this.addressETH = addressETH;
        console.log(this.addressETH);
        console.log(Contract)
        return Contract;
    }

    //isAdmin
    async isAdmin() {
        const Contract = await this.Contract();
        console.log(await Contract.isAdmin())
        return await Contract.isAdmin();
    }


    //getPublishedStars
    async GetStars() {
        const Contract = await this.Contract();
        var getStarsResults = await Contract.getPublishedStars();
        console.log(getStarsResults);
        getStarsResults = getStarsResults.toString()

        this.publicStars = getStarsResults;
        console.log(getStarsResults[1]);
        return getStarsResults;
    }

    //getPublishedStars
    async GetStars1() {
        const Contract = await this.Contract();
        var getStarsResults = Contract.getPublishedStars();
        return getStarsResults;
    }

    //publish stars name, introduction, avatarURL, votes "name", "introduction", "avatarURL", 55
    //"白敬亭","http://233","怀柔王子",55
    async PublishStar(name, introduction, avatarURL, votes){
        const Contract = await this.Contract();    
        console.log(name);
        Contract.publish(name, introduction, avatarURL, votes);      
    }
 
    //vote(uint starId, uint giftAmount, string memory _time)
    async VoteStars(id, giftAmount) {
        const Contract = await this.Contract();
        let currentTime = new Date();
        try {
            let txHash = await Contract.vote(id, giftAmount, currentTime.toLocaleString());
            console.log(txHash)
            return [true, "success"];
        } catch(error) {
            return [false, "😥 " + error.data.message];
        } 

    }

    // Buy gift tokens  BuyTicket(string memory _time)
    async BuyTicket(price) {
        const Contract = await this.Contract();
        let web3 = new Web3(Web3.currentProvider)
        let value = web3.utils.toWei(String(price), "ether");
        console.log(value);
        let currentTime = new Date();
        console.log(currentTime.toLocaleString())
        try {
            let txHash = await Contract.buy(currentTime.toLocaleString(), {value: value});
            console.log(txHash)
            return [true, "success"];
        } catch(error) {
            return [false, "😥 " + error.data.message];
        }
    }

    // Refund gift tokens
    //function refund(uint ethRefund, string memory _time)
    async RefundToken() {
        const Contract = await this.Contract();
        await Contract.refund()
    }

    // Get user transaction records
    //function getTransRecords()
    async GetTransRecord() {
        const Contract = await this.Contract();
        var TransRecord = await Contract.getTransRecords()
        console.log(TransRecord)

        this.transRecord = TransRecord;
        return await TransRecord;
    }

    async GetBalanceInfo() {
        const Contract = await this.Contract();
        var BalanceInfo = await Contract.getBalanceInfo();
        console.log(BalanceInfo.toString())
        return await BalanceInfo;
    }

    async getEthBalanceOf() {
        const Contract = await this.Contract(); 
        console.log(this.addressETH[0])
        let balance = await this.Provider().getBalance(this.addressETH[0]);
        let etherBalance = ethers.utils.formatEther(balance)
        etherBalance = (+etherBalance).toFixed(4);
        console.log(etherBalance)
        return etherBalance;
    }

    render() {
        return (
            <div>
                {/* <div>THIS IS FOR T</div> */}
                <h2>{ }</h2>
                <h3>{this.addressETH}</h3>
                <button onClick={() => this.checkMetamask()}>login</button>
                <button onClick={() => this.Contract()}>contract</button>
                <h3>stars</h3>
                <h3>{this.publicStars}</h3>
                <button onClick={() => this.GetStars()}>show stars</button>
                <button onClick={() => this.PublishStar()}>publish stars</button>
                <button onClick={() => this.VoteStars()}>vote stars</button>
                <button onClick={() => this.GetTransRecord()}>GetTransRecord</button>
                <button onClick={() => this.isAdmin()}>IsAdmin?</button>
                <button onClick={() => this.GetBalanceInfo()}>GetBalanceInfo</button>
                <button onClick={() => this.BuyTicket(1)}>Buy</button>
            </div>

        )
    }


}

export default Web3ABI;
