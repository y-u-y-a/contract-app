// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Booking {
  //
  enum Statuses {
    Vacant,
    Occupied
  }
  //
  address payable public owner;
  Statuses public currentStatuses;

  event DebugOwnerLog(address);

  //
  constructor() {
    owner = payable(msg.sender);
    currentStatuses = Statuses.Vacant;
  }

  // 満室かどうか
  modifier isNoVacant() {
    require(currentStatuses == Statuses.Vacant, 'Already occuppied!!');
    _;
  }

  // お金が足りるかどうか
  modifier hasEnoughCosts(uint _amount) {
    require(msg.value >= 2, 'Not enough ETH');
    _;
  }

  function booking() public payable isNoVacant hasEnoughCosts(2 ether) {
    // 満室にする
    currentStatuses = Statuses.Occupied;
    // オーナーに送金する
    owner.transfer(msg.value);
    // debug
    emit DebugOwnerLog(owner);
  }
}
