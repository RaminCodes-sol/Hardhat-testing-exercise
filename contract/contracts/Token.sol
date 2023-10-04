// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";



contract Token {
    address public owner;
    string public name = "RoboPunksNFT";
    string public symbol = "RP";
    uint256 public totalSupply = 1000;

    mapping (address => uint256) public balances;


    constructor () {
        owner = msg.sender;
        balances[msg.sender] = totalSupply;
    }

    function transfer (address _to, uint256 _amount) external {
        console.log("** Sender balanse is %s tokens **", balances[msg.sender]);
        console.log("** Sender is sending %s to %s address **", _amount, _to);
        require(balances[msg.sender] >= _amount, "not enough balance");
        
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function balanceOf (address _accountAddress) external view returns (uint256) {
        return balances[_accountAddress];
    }
}