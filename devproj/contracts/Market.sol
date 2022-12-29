// SPDX-License-Identifier: WTFPL
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";

interface TokenLike {
    function mint(address account, uint256 amount) external;
}

contract Market is Ownable, Pausable  {
    TokenLike tokenContract;

    uint256 hardCap;
    uint256 currentCap;
    uint256 rate;

    constructor (address _tokenAddress, uint256 _rate, uint256 _hardCap) {
        tokenContract = TokenLike(_tokenAddress);
        rate = _rate;
        hardCap = _hardCap;
    }

    function buy() payable public {
        uint256 tokenAmount = msg.value * rate / 10 ** 18;
        currentCap += tokenAmount;
        require(hardCap >= currentCap, "Market/hardcap reached");

        tokenContract.mint(msg.sender, tokenAmount);
        payable(owner()).transfer(msg.value);
    }

    function setCurrentRate(uint256 _rate) external whenNotPaused {
        rate = _rate;
    }

    function setTokenContract(address _tokenAddress) external whenNotPaused {
        tokenContract = TokenLike(_tokenAddress);
    }

    function setHardCap(uint256 cap) external whenNotPaused {
        hardCap = cap;
    }
}
