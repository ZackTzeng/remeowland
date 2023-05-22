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
  AffinityMax,
  AffinityMin
} from "../codegen/Tables.sol";
import { LocationType } from "../codegen/Types.sol";
import { addressToEntity } from "../Utils.sol";


contract ItemSystem is System {

  /**
   * Add item to the room at position
   * @param item - id of item
   * @param x - x coordinate
   * @param y - y coordinate
   */
  function addItemToRoom(bytes32 item, uint32 x, uint32 y) public {
    bytes32 room = addressToEntity(_msgSender());
    Location.set(item, room, LocationType(2));
    Position.set(item, room, x, y);
  }

  /**
   * Acquire the item into your inventory
   * while spending coin or earning coin
   */
  function acquireItem(uint32 itemType) public {

    ItemTypeData memory itemTypeData = ItemType.get(itemType);
    bytes32 player = addressToEntity(_msgSender());

    int32 balance = Balance.get(player);

    require(balance >= itemTypeData.dCoin, "not enough meowcoins!");

    bytes32 item = keccak256(abi.encode("item", player, blockhash(block.number - 1), block.difficulty));

    OwnedBy.set(item, player);
    Location.set(item, player, LocationType(1));
    Balance.set(player, balance - itemTypeData.dCoin);

    int32 totalAffinity = Affinity.get(player);
    int32 newAffinity =  totalAffinity + itemTypeData.dAffinity;
    Affinity.set(player, totalAffinity + itemTypeData.dAffinity);

    // update global max or min
    if (newAffinity > AffinityMax.get(0)) AffinityMax.set(0, newAffinity);
    if (newAffinity < AffinityMin.get(0)) AffinityMin.set(0, newAffinity);

  }

  /**
   * Update item position
   * @param item - item to move
   * @param x - x coord
   * @param y - y coord
   */
  function moveItem(bytes32 item, uint32 x, uint32 y) public {
    bytes32 room = addressToEntity(_msgSender());
    Position.set(item, room, x, y);
  }

  /**
   * Collect item from game world into the inventory
   * @param item - item to collect
   */
  function collectItemToInventory(bytes32 item) public {

    bytes32 player = addressToEntity(_msgSender());

    // Check if stealable. If not, only owner can collect it.
    ItemTypeData memory itemType = ItemType.get(Item.get(item));
    require(itemType.stealable || player == OwnedBy.get(item), "must be owner");

    OwnedBy.set(item, player);
    Location.set(item, player, LocationType(1));

    Balance.set(player, Balance.get(player) - itemType.dCoin);
    
  }

}
