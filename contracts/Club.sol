//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// token for gift in our system
contract GiftToken{
    uint tokenTotal;    
    uint tokenPrice;    
    uint balanceTokens; // contract remaining token

    // user balance record
    mapping(address=>uint) balances;

    event buySuccess(address addr, uint num);
    event sellSuccess(address addr, uint num);

    //  [tokenTotal, tokenPrice, balance, contract ether, user's token,  user ether]
    function getBalanceInfo() public view returns (
        uint, uint, uint, uint, uint, uint) {
        return (tokenTotal, tokenPrice,
        balanceTokens, address(this).balance,
        balances[msg.sender], msg.sender.balance);
    }

    // buy gift token
    function buy() public payable {
        uint tokensToBuy = msg.value / tokenPrice;
        require(tokensToBuy <= balanceTokens); // remaing token is sufficient
        // update balance
        balances[msg.sender] += tokensToBuy;
        balanceTokens -= tokensToBuy;
        emit buySuccess(msg.sender, tokensToBuy);
    }

    // sell gift tokens
    // TODO change to refund
    function sell(uint tokensToSell) public {
        require(tokensToSell <= balances[msg.sender]); // user should have sufficient token to sell
        // update balance
        uint total = tokensToSell * tokenPrice;
        balances[msg.sender] -= tokensToSell;
        balanceTokens += tokensToSell;
        payable(msg.sender).transfer(total);
        emit sellSuccess(msg.sender, tokensToSell);
    }
}

contract Club is GiftToken {
    constructor (uint _tokens, uint _tokenPrice) {
        tokenTotal = _tokens;       // 100000
        tokenPrice = _tokenPrice;   // 100000000000000000
        balanceTokens = tokenTotal; // 100000
    }

    struct Star {
        string name;
        string inroduction;
        string image;
        uint votes; // number of votes

        uint clen;                          // comment number
        mapping(uint=>Comment) comments;    // comment list
    }

    struct Comment {
        address user; 
        uint date;      
        uint score; 
        string content; 
    }

    event publishSuccess();
    event voteSuccess();

    Star[] stars;

    // publish star, only admin permission can operate
    // TODO permission control
    function publish() public {

    } 

    // vote for star
    function vote(uint starId, uint giftAmount) public {
        require(starId < stars.length);
        Star storage star = stars[starId];
        star.votes += giftAmount;
        balances[msg.sender] -= giftAmount;
        emit voteSuccess();
    }
}