//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Club{
    uint tokenTotal;    
    uint tokenPrice;    
    uint balanceTokens; // contract remaining token
    address public admin;

    constructor (uint _tokens, uint _tokenPrice, address adminad) {
        tokenTotal = _tokens;       // 10^5
        tokenPrice = _tokenPrice;   // 10^17
        balanceTokens = tokenTotal; // 10^5
        admin = adminad;
    }

    struct Star {
        uint id;
        string name;
        string introduction;
        string avatarURL;
        uint votes; // number of votes
    }

    struct TransactionInfo {
        address fanAddress;
        uint time;
        uint transAmount;
    }

    event buySuccess(address addr, uint num);
    event refundSuccess(address addr, uint num);
    event publishSuccess(uint starId, string name, string introduction, string avatarURL, uint votes);
    event voteSuccess();
    event TransactionRecords(TransactionInfo[] records, string eventMsg, bool success);

    // All published stars
    Star[] stars;

    // User address to user related transaction information
    mapping (address => TransactionInfo[]) transRecords;
    // user balance record
    mapping(address=>uint) balances;

    // Check admin permission
    modifier checkAdministrator() {
        require(msg.sender==admin);
        _;
    }

    // Publish star, only admin permission can operate
    function publish(string memory name, string memory introduction, string memory avatarURL, uint votes) public checkAdministrator(){
        uint starId=stars.length-1;
        Star memory starToBePublished=Star(starId, name,introduction,avatarURL,votes);
        stars.push(starToBePublished);
        emit publishSuccess(starId, name,introduction,avatarURL,votes);
    } 

    // vote for star
    function vote(uint starId, uint giftAmount) public {
        require(starId < stars.length);
        Star storage star = stars[starId];
        star.votes += giftAmount;
        balances[msg.sender] -= giftAmount;
        emit voteSuccess();

        TransactionInfo memory trans;
        trans.fanAddress = msg.sender;
        trans.time = block.timestamp;
        trans.transAmount = giftAmount;//???
        transRecords[msg.sender].push(trans);
        emit TransactionRecords(transRecords[msg.sender], "Successfully vote!", true);
    }

    // show the vote result list of all stars
    function getPublishedStars() public view returns (Star[] memory, string memory, bool, uint256){
        return (stars,"Get all published stars!",true, stars.length);
    }

    //  [tokenTotal, tokenPrice, balance, contract ether], [user's token,  user ether]
    function getBalanceInfo() public view returns (
        uint, uint, uint, uint) {
        if(msg.sender==admin)
            return (tokenTotal, tokenPrice, balanceTokens, address(this).balance);
        return (balances[msg.sender], msg.sender.balance,0,0);
    }

    // Buy gift tokens
    function buy() public payable {
        require(msg.value>=tokenPrice);
        uint tokensToBuy = msg.value / tokenPrice;
        require(tokensToBuy <= balanceTokens); // remaing token is sufficient
        // update balance
        balances[msg.sender] += tokensToBuy;
        balanceTokens -= tokensToBuy;
        emit buySuccess(msg.sender, tokensToBuy);

        TransactionInfo memory trans;
        trans.fanAddress = msg.sender;
        trans.time = block.timestamp;
        trans.transAmount = tokensToBuy;//???
        transRecords[msg.sender].push(trans);
        emit TransactionRecords(transRecords[msg.sender], "Successfully buy tokens!", true);
    }

    // Refund gift tokens
    function refund(uint tokenRefund) public returns(bool success) {
        require(tokenRefund > 0);
        require(tokenRefund <= balances[msg.sender]); // user should have sufficient token to sell
        // update balance
        uint total = tokenRefund * tokenPrice;
        balances[msg.sender] -= tokenRefund;
        balanceTokens += tokenRefund;
        payable(msg.sender).transfer(total);
        emit refundSuccess(msg.sender, tokenRefund);

        TransactionInfo memory trans;
        trans.fanAddress = msg.sender;
        trans.time = block.timestamp;
        trans.transAmount = tokenRefund;
        transRecords[msg.sender].push(trans);
        emit TransactionRecords(transRecords[msg.sender], "Successfully refund!", true);

        return true;
    }

    // Get user transaction records
    function getTransRecords() public view returns(TransactionInfo[] memory, string memory, bool, uint256) {
        return (transRecords[msg.sender], "Get transactions!", true, transRecords[msg.sender].length);
    }

}