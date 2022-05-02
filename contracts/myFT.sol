// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract myFT is ERC20 {

    constructor() ERC20("KDY", "KDY") {
          _mint(msg.sender, 100000000e18);
    }
    
}