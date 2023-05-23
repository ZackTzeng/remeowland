// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import {
  Cat,
  CatTableId,
  Location,
  Position,
  OwnedBy,
  Item,
  ItemType,
  ItemTypeData,
  Balance,
  Affinity,
  AffinityMax,
  AffinityMin,
  LastVisit
} from "../codegen/Tables.sol";
import { LocationType } from "../codegen/Types.sol";
import { addressToEntity } from "../Utils.sol";
import { query, QueryFragment, QueryType } from "@latticexyz/world/src/modules/keysintable/query.sol";

contract EnterSystem is System {

  /**
   * Viewing a room triggers stats computation
   * @param room - room to visit
   */
  function visitRoom(bytes32 room) public {

    // Schrödinger's cat - no observer means uncertainty and don't care what's going on
    bytes32 player = addressToEntity(_msgSender());

    uint256 dTime = block.number - LastVisit.get(room);
    LastVisit.set(room, block.number);

    // get all cats (coding all steps for clarity)
    QueryFragment[] memory fragments = new QueryFragment[](1);
    fragments[0] = QueryFragment(QueryType.Has, CatTableId, new bytes(0));
    bytes32[][] memory keyTuples = query(fragments);
    bytes32[] memory cats = keyTuples[0]; 

    // normalized affinity
    uint32 aff = uint32(Affinity.get(room) * 100 / AffinityMax.get(0) - AffinityMin.get(0));

    uint32[2] memory scene = computeCatAndItems(aff, dTime, uint32(cats.length));

    // pseudorandom - can replace with Chainlink VRF
    
    // place cats
    for (uint i = 0; i < scene[0]; i++) {
      uint256 rand = uint256(keccak256(abi.encode(aff, i, player, room, blockhash(block.number - 1), block.difficulty)));
      bytes32 catId = cats[rand % cats.length];
      Position.set(catId, room, uint32((rand + i) % 160), uint32((rand + i * 12) % 100));
      uint32 numVisits = Cat.get(catId);
      Cat.set(catId, numVisits +1);

    }

    // place items
    for (uint i = 0; i < scene[1]; i++) {
      uint256 rand = uint256(keccak256(abi.encode(aff, i, player, room, blockhash(block.number - 1), block.difficulty)));

      ItemTypeData memory itemTypeData = ItemType.get(uint32(rand % 3));

      bytes32 item = keccak256(abi.encode("item", player, blockhash(block.number - 1), block.difficulty));

      OwnedBy.set(item, player);
      Location.set(item, room, LocationType(2));
      Position.set(item, room, uint32((rand + i) % 160), uint32((rand + i * 12) % 100));
      int32 totalAffinity = Affinity.get(room);

      int32 newAffinity = totalAffinity + itemTypeData.dAffinity;
      Affinity.set(room, newAffinity);
      
      // update global max or min
      if (newAffinity > AffinityMax.get(0)) AffinityMax.set(0, newAffinity);
      if (newAffinity < AffinityMin.get(0)) AffinityMin.set(0, newAffinity);

    }

  }


  /**
   * Compute number of cats and number of items
   * @param affinity - normalized affinity
   * @param dTime - time since last visit
   */
  function computeCatAndItems(uint32 affinity, uint256 dTime, uint32 totalCats) public pure returns (uint32[2] memory) {
    // for the sake of hackathon, we will do a simple version
    // TODO future - can use poisson distribution and gaussian function
    uint32 dBlocknumber = 30;
    uint32 numCats;
    uint32 numItems;
    if (affinity < 10) {
      numCats = 0;
      numItems = 1;
    } else if (affinity > 10 && affinity < 90) {
      numCats = uint32(affinity / 10 * dTime / dBlocknumber);
    } else {
      // max 10 cats a room
      if (totalCats > 10) {
        numCats = 10;
      } else {
        numCats = totalCats;
      }
      numItems = uint32(numCats * dTime / dBlocknumber);
    }
    return [numCats, numItems];
  }

}
