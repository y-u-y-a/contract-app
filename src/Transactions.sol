// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Transactions {
    // 仮想通貨の受け渡しに必要なデータ
    struct TransferStruct {
        address sender;
        address reciever;
        uint amount;
    }

    TransferStruct[] transactions;

    event Transfer(address from, address reciever, uint amount);

    function addToBlockChain(address payable reciever, uint amount) public {
        transactions.push(TransferStruct(msg.sender, reciever, amount));

        emit Transfer(msg.sender, reciever, amount);
    }
}
