//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Vouching {
    mapping(address => address[]) private sent;
    //address 1 sent x vouches to addresses

    mapping(address => address[]) private received;

    //address 1 received x vouches from addresses

    function getClaimableVouches(
        address a
    ) public view returns (address[] memory) {
        return received[a];
    }

    function addVouch(address receiver) external payable {
        bool isPresent = false;
        for (uint i = 0; i < sent[msg.sender].length; i++) {
            if (sent[msg.sender][i] == receiver) {
                isPresent = true;
                break;
            }
        }
        require(!isPresent, "Already vouched");
        sent[msg.sender].push(receiver);
        received[receiver].push(msg.sender);
    }
}
