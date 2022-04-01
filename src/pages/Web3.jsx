
import React from "react";

//eth
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./Contract"



class Web3ABI extends React.Component {
    
    //state
    state = {
        addressETH: "",
        publicStars: [],
        transRecord: []
    }

    //check metamask
    async checkMetamask() {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Please install Metemaske");
        }
        console.log("metamask ok");
        const addressETH = await this.Provider().send("eth_requestAccounts", []);
        console.log(addressETH);
        this.setState({ addressETH: addressETH });
    }

    //provider
    Provider() {
        return new ethers.providers.Web3Provider(window.ethereum);
    }

    //contract
    Contract() {
        const Provider = this.Provider();
        const signer = Provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(Contract)
        return Contract;
    }

    //isAdmin
    async isAdmin() {
        const Contract = this.Contract();
        console.log(await Contract.isAdmin())
        return await Contract.isAdmin();
    }


    //getPublishedStars
    async GetStars() {
        const Contract = this.Contract();
        var getStarsResults = await Contract.getPublishedStars();
        console.log(getStarsResults);
        getStarsResults = getStarsResults.toString()

        this.setState({ publicStars: getStarsResults });
        console.log(getStarsResults[1]);
        return getStarsResults;
    }

    //getPublishedStars
    GetStars1() {
        const Contract = this.Contract();
        var getStarsResults = Contract.getPublishedStars();
        return getStarsResults;
    }

    //publish stars name, introduction, avatarURL, votes "name", "introduction", "avatarURL", 55
    //"白敬亭","http://233","怀柔王子",55
    PublishStar(name, introduction, avatarURL, votes){
        const Contract = this.Contract();    
        console.log(name);
        Contract.publish(name, introduction, avatarURL, votes);      
    }
 
    //vote(uint starId, uint giftAmount, string memory _time)
    VoteStars() {
        const Contract = this.Contract();
        Contract.vote(1, 2, "v");
    }

    // Buy gift tokens  BuyTicket(string memory _time)
    BuyTicket() {
        const Contract = this.Contract();
        Contract.buy("b");
    }

    // Refund gift tokens
    //function refund(uint ethRefund, string memory _time)
    RefundToken() {
        const Contract = this.Contract();
        Contract.refund()
    }

    // Get user transaction records
    //function getTransRecords()
    async GetTransRecord() {
        const Contract = this.Contract();
        var TransRecord = await Contract.getTransRecords()
        console.log(TransRecord)

        this.setState({ transRecord: TransRecord });
    }

    async GetBalanceInfo() {
        const Contract = this.Contract();
        var BalanceInfo = await Contract.getBalanceInfo();
        console.log(BalanceInfo.toString())
        return await BalanceInfo;
    }

    render() {
        return (
            <div>
                <div>THIS IS FOR T</div>
                <h2>{ }</h2>
                <h3>{this.state.addressETH}</h3>
                <button onClick={() => this.checkMetamask()}>login</button>
                <button onClick={() => this.Contract()}>contract</button>
                <h3>stars</h3>
                <h3>{this.state.publicStars}</h3>
                <button onClick={() => this.GetStars()}>show stars</button>
                <button onClick={() => this.PublishStar()}>publish stars</button>
                <button onClick={() => this.VoteStars()}>vote stars</button>
                <button onClick={() => this.GetTransRecord()}>GetTransRecord</button>
                <button onClick={() => this.IsAAdmin()}>IsAdmin?</button>
                <button onClick={() => this.GetBalanceInfo()}>GetBalanceInfo</button>
            </div>

        )
    }


}

export default Web3ABI;
