//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract SimpleBank {
    mapping(address => uint256) private balances;

    constructor() payable {}

    function balance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public payable {
        require(amount <= balances[msg.sender]);
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function transfer(address to, uint256 amount) public payable{
        require(amount <= balances[msg.sender]);
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function total() public view returns (uint256) {
        return address(this).balance;
    }
}
