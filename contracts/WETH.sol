//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract WETH is ERC20 {
  constructor() ERC20("Wrapped Ethereum", "WETH") {}

  function withdraw(uint256 amount) public {
    _burn(msg.sender, amount);

    /**
    * transfer (throws error) and send (returns bool) have 
    * 2300 gas limit so not recommended
    * 
    * using "call" you can provide custom gas or supply all the
    * gas of the transaction so its recommended
    */
    (bool sent,) = msg.sender.call{value: amount}("");
    require(sent, "Failed to send Ether");
  }

  receive() external payable {
    _mint(msg.sender, msg.value);
  }
}
