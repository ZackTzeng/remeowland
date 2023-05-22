// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import {
  Location,
  Position,
  OwnedBy,
  Item,
  ItemType,
  ItemTypeData,
  Balance,
  Affinity,
  Shelter,
  Cat
} from "../codegen/Tables.sol";
import { LocationType } from "../codegen/Types.sol";
import { addressToEntity } from "../Utils.sol";

contract CatSystem is System {

  /**
   * Visit room at position
   * @param x - x coordinate
   * @param y - y coordinate
   */
  function vistRoom(bytes32 cat, bytes32 room, uint32 x, uint32 y) public {
    bytes32 player = addressToEntity(_msgSender());
    require(player == OwnedBy.get(cat), "not allowed");    
    Position.set(cat, room, x, y);
  }

  /**
   * Gives item to player (leave items in their room)
   * @param itemType - type of item to generate
   */
  function giveItem(bytes32 cat, bytes32 room, uint32 itemType, uint32 x, uint32 y) public {

    bytes32 player = addressToEntity(_msgSender());
    require(player == OwnedBy.get(cat), "not allowed");

    ItemTypeData memory itemTypeData = ItemType.get(itemType);

    bytes32 item = keccak256(abi.encode("item", player, blockhash(block.number - 1), block.difficulty));

    OwnedBy.set(item, player);
    Location.set(item, room, LocationType(2));
    Position.set(item, room, x, y);

    int32 totalAffinity = Affinity.get(player);

    Affinity.set(room, totalAffinity + itemTypeData.dAffinity);

  }

  /**
   * Update cats
   * @param uri - uri to the folder of cats
   * @param total - total number of cats
   */
  function updateCats(string calldata uri, uint32 total) public {

    bytes32 player = addressToEntity(_msgSender());
    Shelter.set(player, total, uri);

    for (uint32 i = 0; i < total; i++) {
      bytes32 catId = keccak256(abi.encode("cat", player, blockhash(block.number - 1), block.difficulty));
      Cat.set(catId, 0); // id --> visitor: starting at shelter
      OwnedBy.set(catId, player);
      Position.set(catId, player, 0, i);
    }
    

  }


}
