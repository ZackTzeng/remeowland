// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

interface IEnterSystem {
  function visitRoom(bytes32 room) external;

  function computeCatAndItems(
    uint32 affinity,
    uint256 dTime,
    uint32 totalCats
  ) external pure returns (uint32[2] memory);
}
