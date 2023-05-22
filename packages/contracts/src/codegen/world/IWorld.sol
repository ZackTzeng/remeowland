// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

import { IBaseWorld } from "@latticexyz/world/src/interfaces/IBaseWorld.sol";

import { ICatSystem } from "./ICatSystem.sol";
import { IEnterSystem } from "./IEnterSystem.sol";
import { IItemSystem } from "./IItemSystem.sol";
import { IToDoSystem } from "./IToDoSystem.sol";

/**
 * The IWorld interface includes all systems dynamically added to the World
 * during the deploy process.
 */
interface IWorld is IBaseWorld, ICatSystem, IEnterSystem, IItemSystem, IToDoSystem {

}
