const fs = require("fs");
var myFT = artifacts.require("./myFT.sol");

module.exports = function(deployer) {

  deployer.deploy(myFT).then(() => {
    console.log("deploy...");
    if (myFT._json) {
        fs.writeFileSync("ABI", JSON.stringify(myFT._json.abi), (err) => {
            if (err){
              console.log(err);
            }
            console.log("ABI Success");
        });

        fs.writeFileSync("address", myFT.address, (err) => {
            if (err) throw err;
            console.log("Address Success");
        });
    }
});
  
};
