//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import './SimpleToken.sol';

contract SimpleBank {
    SimpleToken ST;
    mapping(address => uint256) public balances;

    constructor(address _tokenAddr) payable {
        ST = SimpleToken(_tokenAddr);
    }

    function balance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function deposit(uint256 amount) public payable {
        balances[msg.sender] += amount;
        ST.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint256 amount) public payable {
        require(amount <= balances[msg.sender]);
        balances[msg.sender] -= amount;
        ST.transfer(msg.sender, amount);
    }

    function transfer(address to, uint256 amount) public payable{
        require(amount <= balances[msg.sender]);
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function total() public view returns (uint256) {
        return ST.balanceOf(address(this));
    }
}
