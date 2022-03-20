const { expect } = require("chai");
const { ethers } = require("hardhat");
const { toWei } = require("web3-utils");

describe("HardHat Test for Fan Club Smart Contract",function(){
    
    const tokenTotal=10000;    
    const tokenPrice=10**10;
    const tokensBought=1000;
    const tokensRefund=5;
    var current = new Date();

    beforeEach(async function() {
        // Get contractfactory and signers here
        provider=ethers.provider;
        Token = await ethers.getContractFactory("Club");
       [owner, fan1,fan2,fan3,fan4,fan5,fan6,fan7,fan8] = await ethers.getSigners();
       
       // Deploy our contract, wait for the transaction to be mined
       hardhatToken = await Token.deploy(tokenTotal,tokenPrice,owner.address);
    });

    it('1. The balance of the contract can be achieved correctly',async() =>{
        // Get the balance of the smart contract with admin permission
        const getBalanceNumofAdmin = await hardhatToken.connect(owner).getBalanceInfo();
        await expect(getBalanceNumofAdmin[0].toNumber()).to.be.equal(tokenTotal);
        await expect(getBalanceNumofAdmin[1].toNumber()).to.be.equal(tokenPrice);
        await expect(getBalanceNumofAdmin[2].toNumber()).to.be.equal(tokenTotal);
        await expect(getBalanceNumofAdmin[3].toNumber()).to.be.equal(0);

        // Get the balance of a fan
        const getBalanceNumofFan = await hardhatToken.connect(fan1.address).getBalanceInfo();
        await expect(getBalanceNumofFan[0].toNumber()).to.be.equal(0);
        await expect(getBalanceNumofFan[1]).to.be.equal(await provider.getBalance(fan1.address));
    });

    it('2. The fan can buy token and the balance of the smart contract and the fan should be adjusted correctly',async() =>{
        // Buy fan club tokens
        const getBalanceNumofFanBeforeBuy=await hardhatToken.connect(fan2.address).getBalanceInfo();
        const getBalanceNumofAdminBeforeBuy=await hardhatToken.connect(owner.address).getBalanceInfo();
        const etherBalanceOfAdminBeforeBuy=await provider.getBalance(hardhatToken.address);
        console.log(etherBalanceOfAdminBeforeBuy);
        await hardhatToken.connect(fan2).buy(current.toLocaleString(),{from: fan2.address, value: tokensBought*tokenPrice});
        const getBalanceNumofFanAfterBuy=await hardhatToken.connect(fan2.address).getBalanceInfo();
        const getBalanceNumofAdminAfterBuy=await hardhatToken.connect(owner.address).getBalanceInfo();
        const etherBalanceOfAdminAfterBuy=await provider.getBalance(hardhatToken.address);
        console.log(etherBalanceOfAdminAfterBuy);
        
        // Calculate token balance differences
        const balanceDiffofFan=getBalanceNumofFanAfterBuy[0]-getBalanceNumofFanBeforeBuy[0];
        await expect(balanceDiffofFan).to.be.equal(tokensBought);
        const balanceDiffofAdmin=getBalanceNumofAdminAfterBuy[2]-getBalanceNumofAdminBeforeBuy[2];
        await expect(balanceDiffofAdmin).to.be.equal(-tokensBought);
        const etherDiffofAdminBuy=etherBalanceOfAdminAfterBuy-etherBalanceOfAdminBeforeBuy;
        expect((tokensBought*tokenPrice).toString()).to.equal(etherDiffofAdminBuy.toString());
    });

    it('3. The fan can get refund with requested amount of tokens',async() =>{
        // Refund fan club tokens
        // await hardhatToken.connect(fan4).buy({from: fan4.address, value: tokensBought*tokenPrice});
        // const getBalanceNumofFanBeforeRefund=await hardhatToken.connect(fan4.address).getBalanceInfo();
        // console.log(await provider.getBalance(fan4.address));
        // const getBalanceNumofAdminBeforeRefund=await hardhatToken.connect(owner.address).getBalanceInfo();
        // await hardhatToken.connect(fan4).refund(tokensRefund);
        // const getBalanceNumofFanAfterRefund=await hardhatToken.connect(fan4.address).getBalanceInfo();
        // console.log(await provider.getBalance(fan4.address));
        // const getBalanceNumofAdminAfterRefund=await hardhatToken.connect(owner.address).getBalanceInfo();

        // // Calculate token balance differences
        // const balanceDiffofFan1=getBalanceNumofFanBeforeRefund[0]-getBalanceNumofFanAfterRefund[0];
        // await expect(balanceDiffofFan1).to.be.equal(tokensRefund);
        // const ethDiffofFan1=getBalanceNumofFanAfterRefund[1]-getBalanceNumofFanBeforeRefund[1];
        // expect(ethDiffofFan1).to.be.at.most(tokensRefund*tokenPrice);
        // expect(ethDiffofFan1).to.be.at.least(0);
        // const balanceDiffofAdmin1=getBalanceNumofAdminAfterRefund[2]-getBalanceNumofAdminBeforeRefund[2];
        // await expect(balanceDiffofAdmin1).to.be.equal(tokensRefund);
    });

    it('3.1. The fan can get refund with requested amount of tokens',async() =>{
        console.log(await provider.getBalance(fan4.address));
        await hardhatToken.connect(fan4).buy(current.toLocaleString(),{from: fan4.address, value: tokensBought*tokenPrice});
        console.log(await provider.getBalance(fan4.address));
        await hardhatToken.connect(fan4).testTransfer(ethers.BigNumber.from("10000000000000"));
        console.log(await provider.getBalance(fan4.address));
    });

    it('4. Fans don not have permissions to publish new stars',async() =>{
        await expect(hardhatToken.connect(fan4).publish("TEST","TEST", "https://TEST.jpg",2,fan1.getAddress())).to.be.reverted;
    });

    it('5. Admin can publish new stars',async() =>{
        // Check the stars list before new ones published
        const starsList=await hardhatToken.connect(fan5.address).getPublishedStars();
        await expect(starsList[3].toNumber()).to.be.equal(0);

        // Publish two new stars
        const publishStar=await hardhatToken.connect(owner).publish("Lana Del Rey","An American singer and songwriter. Her music is noted for its cinematic quality and exploration of tragic romance, glamour, and melancholia, containing references to contemporary pop culture and 1950s–1960s Americana.", "https://en.wikipedia.org/wiki/Lana_Del_Rey#/media/File:Lana_Del_Rey_@_Grammy_Museum_10_13_2019_(49311023203).jpg",10);
        await expect(publishStar).to.emit(hardhatToken, "publishSuccess").withArgs(0,"Lana Del Rey","An American singer and songwriter. Her music is noted for its cinematic quality and exploration of tragic romance, glamour, and melancholia, containing references to contemporary pop culture and 1950s–1960s Americana.", "https://en.wikipedia.org/wiki/Lana_Del_Rey#/media/File:Lana_Del_Rey_@_Grammy_Museum_10_13_2019_(49311023203).jpg",10);        
        const publishStar1=await hardhatToken.connect(owner).publish("Avril Lavigne","A Canadian singer and songwriter. She has released seven studio albums and has received several accolades and nominations, including eight Grammy Award nominations.", "https://en.wikipedia.org/wiki/Avril_Lavigne#/media/File:Avril_Lavigne_@_Grammy_Museum_09_05_2019_(49311430057).jpg",2);
        await expect(publishStar1).to.emit(hardhatToken, "publishSuccess").withArgs(1,"Avril Lavigne","A Canadian singer and songwriter. She has released seven studio albums and has received several accolades and nominations, including eight Grammy Award nominations.", "https://en.wikipedia.org/wiki/Avril_Lavigne#/media/File:Avril_Lavigne_@_Grammy_Museum_09_05_2019_(49311430057).jpg",2);

        // Check the stars list after new ones published
        const starsListAfterPublished=await hardhatToken.connect(fan5.address).getPublishedStars();
        await expect(starsListAfterPublished[3].toNumber()).to.be.equal(2);
    });

    it('6. Fans can vote for stars',async() =>{
        // Publish two new stars
        const publishStar=await hardhatToken.connect(owner).publish("Lana Del Rey","An American singer and songwriter. Her music is noted for its cinematic quality and exploration of tragic romance, glamour, and melancholia, containing references to contemporary pop culture and 1950s–1960s Americana.", "https://en.wikipedia.org/wiki/Lana_Del_Rey#/media/File:Lana_Del_Rey_@_Grammy_Museum_10_13_2019_(49311023203).jpg",10);
        const publishStar1=await hardhatToken.connect(owner).publish("Avril Lavigne","A Canadian singer and songwriter. She has released seven studio albums and has received several accolades and nominations, including eight Grammy Award nominations.", "https://en.wikipedia.org/wiki/Avril_Lavigne#/media/File:Avril_Lavigne_@_Grammy_Museum_09_05_2019_(49311430057).jpg",2);

        // Vote for stars
        const buyTokens=await hardhatToken.connect(fan6).buy(current.toLocaleString(),{from: fan6.address, value: tokensBought*tokenPrice});
        const voteForStar=await hardhatToken.connect(fan6).vote(0,tokensBought,current.toLocaleString());

        // Check votes after voting
        const starsListAfterPublished1=await hardhatToken.connect(fan6.address).getPublishedStars();
        await expect(starsListAfterPublished1[0][0].votes.toNumber()).to.be.equal(10+tokensBought);
    });

    it('7. Fans can check their transaction history',async() =>{
        //Check history "Buy"
        const time1=current.toLocaleString();
        const fanTransHisBuy=await hardhatToken.connect(fan7).buy(time1,{from: fan7.address, value: tokensBought*tokenPrice});
        const fanTransHis=await hardhatToken.connect(fan7).getTransRecords();
        expect(fanTransHis[1]).to.be.equal("Get transactions!");
        expect(fanTransHis[0][0].fanAddress).to.be.equal(fan7.address);
        expect(fanTransHis[0][0].transAmount).to.be.equal(tokensBought);
        expect(fanTransHis[0][0].transType).to.be.equal("Buy");
        expect(fanTransHis[0][0].time).to.be.equal(time1);

        //Check history "Vote"
        const publishStar=await hardhatToken.connect(owner).publish("Lana Del Rey","An American singer and songwriter. Her music is noted for its cinematic quality and exploration of tragic romance, glamour, and melancholia, containing references to contemporary pop culture and 1950s–1960s Americana.", "https://en.wikipedia.org/wiki/Lana_Del_Rey#/media/File:Lana_Del_Rey_@_Grammy_Museum_10_13_2019_(49311023203).jpg",10);
        const time2=current.toLocaleString();
        const fanTransHisVote=await hardhatToken.connect(fan7).vote(0,tokensBought,time2);
        const fanTransHis1=await hardhatToken.connect(fan7).getTransRecords();
        expect(fanTransHis1[1]).to.be.equal("Get transactions!"); 
        expect(fanTransHis1[0][1].fanAddress).to.be.equal(fan7.address);
        expect(fanTransHis1[0][1].transAmount).to.be.equal(tokensBought);
        expect(fanTransHis1[0][1].transType).to.be.equal("Vote");
        expect(fanTransHis1[0][1].time).to.be.equal(time2);
        
        //Check history "Refund"
        const time3=current.toLocaleString();
        await hardhatToken.connect(fan7).buy(time1,{from: fan7.address, value: tokensBought*tokenPrice});
        await hardhatToken.connect(fan7).refund(tokensRefund,time3);
        const fanTransHis2=await hardhatToken.connect(fan7).getTransRecords();
        expect(fanTransHis2[1]).to.be.equal("Get transactions!"); 
        expect(fanTransHis2[0][3].fanAddress).to.be.equal(fan7.address);
        expect(fanTransHis2[0][3].transAmount).to.be.equal(tokensRefund);
        expect(fanTransHis2[0][3].transType).to.be.equal("Refund");
        expect(fanTransHis2[0][3].time).to.be.equal(time3);
    });

    it('8. Fans can get all stars',async() =>{
        // Publish two new stars
        await hardhatToken.connect(owner).publish("Lana Del Rey","An American singer and songwriter. Her music is noted for its cinematic quality and exploration of tragic romance, glamour, and melancholia, containing references to contemporary pop culture and 1950s–1960s Americana.", "https://en.wikipedia.org/wiki/Lana_Del_Rey#/media/File:Lana_Del_Rey_@_Grammy_Museum_10_13_2019_(49311023203).jpg",10);
        await hardhatToken.connect(owner).publish("Avril Lavigne","A Canadian singer and songwriter. She has released seven studio albums and has received several accolades and nominations, including eight Grammy Award nominations.", "https://en.wikipedia.org/wiki/Avril_Lavigne#/media/File:Avril_Lavigne_@_Grammy_Museum_09_05_2019_(49311430057).jpg",2);
        
        // Get all stars
        const getStars=await hardhatToken.connect(fan8).getPublishedStars();
        expect(getStars[0].length).to.be.equal(2);
    });
});