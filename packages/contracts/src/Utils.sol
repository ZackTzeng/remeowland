// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

function addressToEntity(address a) pure returns (bytes32) {
  return bytes32(uint256(uint160((a))));
}

/**
 * @dev Converts a `int256` to its ASCII `string` decimal representation.
//  */
// function toString(int256 value) pure returns (string memory) {
//     return string(abi.encodePacked(value < 0 ? "-" : "", toString(SignedMath.abs(value))));
// }