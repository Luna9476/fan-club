//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract Club{
    uint tokenTotal;    
    uint tokenPrice;    
    uint balanceTokens; // contract remaining token
    address public admin;

    constructor (uint _tokens, uint _tokenPrice, address adminad) {
        tokenTotal = _tokens;       
        tokenPrice = _tokenPrice;   
        balanceTokens = tokenTotal; 
        admin = adminad;
    }

    struct Star {
        uint id;
        string name;
        string introduction;
        string avatarURL;
        uint votes; // Number of votes
    }

    struct TransactionInfo {
        address fanAddress;
        string transType; // Buy/Vote/Refund
        string time;
        uint transAmount;
    }

    event buySuccess(address addr, uint num);
    event refundSuccess(address addr, uint num);
    event publishSuccess(uint starId, string name, string introduction, string avatarURL, uint votes);
    event TransactionRecords(TransactionInfo[] records, string eventMsg, bool success);

    // All published stars
    Star[] stars;

    // User address to user related transaction information
    mapping (address => TransactionInfo[]) transRecords;
    // User balance record
    mapping(address => uint) balances;

    // Check admin permission
    modifier checkAdministrator() {
        require(msg.sender == admin,"You are not admin!");
        _;
    }

    function isAdmin() public view returns (bool){
        console.log(msg.sender);
        console.log(admin);
        return msg.sender == admin;
    }

    // Publish star, only admin permission can operate
    function publish(string memory name, string memory introduction, string memory avatarURL, uint votes) public checkAdministrator(){
        uint starId = stars.length;
        Star memory starToBePublished = Star(starId, name,introduction,avatarURL,votes);
        stars.push(starToBePublished);
        emit publishSuccess(starId, name,introduction,avatarURL,votes);
    } 

    // Vote for star
    function vote(uint starId, uint giftAmount, string memory _time) public {
        require(starId < stars.length);
        require(giftAmount <= balances[msg.sender]);
        Star storage star = stars[starId];
        star.votes += giftAmount;
        balances[msg.sender] -= giftAmount;

        TransactionInfo memory trans;
        trans.fanAddress = msg.sender;
        trans.time = _time;
        trans.transAmount = giftAmount;//???
        trans.transType = "Vote";
        transRecords[msg.sender].push(trans);
        emit TransactionRecords(transRecords[msg.sender], "Successfully vote!", true);
    }

    // Show the vote result list of all stars
    function getPublishedStars() public view returns (Star[] memory, string memory, bool, uint256){
        return (stars,"Get all published stars!",true, stars.length);
    }

    // For admin: return [tokenTotal, tokenPrice, balance, contract_ether]
    // For fans: retrn [user's token,  user ether, 0, 0]
    function getBalanceInfo() public view returns (
        uint, uint, uint, uint) {
        if(msg.sender == admin)
            return (tokenTotal, tokenPrice, balanceTokens, address(this).balance);
        console.log(msg.sender.balance);
        
        return (balances[msg.sender], msg.sender.balance,0,0);
    }

    // Buy gift tokens
    function buy(string memory _time) public payable {
        require(msg.value >= tokenPrice, "Not enough payment!");
        require(msg.value <= msg.sender.balance);
        uint tokensToBuy = msg.value / tokenPrice;
        require(tokensToBuy <= balanceTokens, "Not enough tokens"); // remaing token is sufficient
        // update balance
        balances[msg.sender] += tokensToBuy;
        balanceTokens -= tokensToBuy;
        emit buySuccess(msg.sender, tokensToBuy);
        
        // Update transaction history
        TransactionInfo memory trans;
        trans.fanAddress = msg.sender;
        trans.time = _time;
        trans.transAmount = tokensToBuy;
        trans.transType = "Buy";
        transRecords[msg.sender].push(trans);
        emit TransactionRecords(transRecords[msg.sender], "Successfully buy tokens!", true);
    }

    // Refund gift tokens
    function refund(uint ethRefund, string memory _time) public returns(bool success){
        uint tokenRefund = ethRefund / tokenPrice;
        require(tokenRefund > 0);
        require(tokenRefund <= balances[msg.sender]); // User should have sufficient token to sell
        balances[msg.sender] -= tokenRefund;
        balanceTokens += tokenRefund;
        payable(msg.sender).transfer(ethRefund);
        emit refundSuccess(msg.sender, tokenRefund);

        TransactionInfo memory trans;
        trans.fanAddress = msg.sender;
        trans.time = _time;
        trans.transAmount = tokenRefund;
        trans.transType = "Refund";
        transRecords[msg.sender].push(trans);
        emit TransactionRecords(transRecords[msg.sender], "Successfully refund!", true);

        return true;
    }

    // Get user transaction records
    function getTransRecords() public view returns(TransactionInfo[] memory, string memory, bool, uint256) {
        return (transRecords[msg.sender], "Get transactions!", true, transRecords[msg.sender].length);
    }
}