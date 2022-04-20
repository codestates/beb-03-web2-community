var myNFT = artifacts.require("./myNFT.sol");

module.exports = function(deployer) {

  deployer.deploy(myNFT);
  
};
