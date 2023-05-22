// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

// Import schema type
import { SchemaType } from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { PackedCounter, PackedCounterLib } from "@latticexyz/store/src/PackedCounter.sol";

bytes32 constant _tableId = bytes32(abi.encodePacked(bytes16(""), bytes16("Position")));
bytes32 constant PositionTableId = _tableId;

struct PositionData {
  bytes32 room;
  uint32 x;
  uint32 y;
}

library Position {
  /** Get the table's schema */
  function getSchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](3);
    _schema[0] = SchemaType.BYTES32;
    _schema[1] = SchemaType.UINT32;
    _schema[2] = SchemaType.UINT32;

    return SchemaLib.encode(_schema);
  }

  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](1);
    _schema[0] = SchemaType.BYTES32;

    return SchemaLib.encode(_schema);
  }

  /** Get the table's metadata */
  function getMetadata() internal pure returns (string memory, string[] memory) {
    string[] memory _fieldNames = new string[](3);
    _fieldNames[0] = "room";
    _fieldNames[1] = "x";
    _fieldNames[2] = "y";
    return ("Position", _fieldNames);
  }

  /** Register the table's schema */
  function registerSchema() internal {
    StoreSwitch.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Register the table's schema (using the specified store) */
  function registerSchema(IStore _store) internal {
    _store.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Set the table's metadata */
  function setMetadata() internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    StoreSwitch.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Set the table's metadata (using the specified store) */
  function setMetadata(IStore _store) internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    _store.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Get room */
  function getRoom(bytes32 id) internal view returns (bytes32 room) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 0);
    return (Bytes.slice32(_blob, 0));
  }

  /** Get room (using the specified store) */
  function getRoom(IStore _store, bytes32 id) internal view returns (bytes32 room) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 0);
    return (Bytes.slice32(_blob, 0));
  }

  /** Set room */
  function setRoom(bytes32 id, bytes32 room) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    StoreSwitch.setField(_tableId, _keyTuple, 0, abi.encodePacked((room)));
  }

  /** Set room (using the specified store) */
  function setRoom(IStore _store, bytes32 id, bytes32 room) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    _store.setField(_tableId, _keyTuple, 0, abi.encodePacked((room)));
  }

  /** Get x */
  function getX(bytes32 id) internal view returns (uint32 x) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 1);
    return (uint32(Bytes.slice4(_blob, 0)));
  }

  /** Get x (using the specified store) */
  function getX(IStore _store, bytes32 id) internal view returns (uint32 x) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 1);
    return (uint32(Bytes.slice4(_blob, 0)));
  }

  /** Set x */
  function setX(bytes32 id, uint32 x) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    StoreSwitch.setField(_tableId, _keyTuple, 1, abi.encodePacked((x)));
  }

  /** Set x (using the specified store) */
  function setX(IStore _store, bytes32 id, uint32 x) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    _store.setField(_tableId, _keyTuple, 1, abi.encodePacked((x)));
  }

  /** Get y */
  function getY(bytes32 id) internal view returns (uint32 y) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 2);
    return (uint32(Bytes.slice4(_blob, 0)));
  }

  /** Get y (using the specified store) */
  function getY(IStore _store, bytes32 id) internal view returns (uint32 y) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 2);
    return (uint32(Bytes.slice4(_blob, 0)));
  }

  /** Set y */
  function setY(bytes32 id, uint32 y) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    StoreSwitch.setField(_tableId, _keyTuple, 2, abi.encodePacked((y)));
  }

  /** Set y (using the specified store) */
  function setY(IStore _store, bytes32 id, uint32 y) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    _store.setField(_tableId, _keyTuple, 2, abi.encodePacked((y)));
  }

  /** Get the full data */
  function get(bytes32 id) internal view returns (PositionData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    bytes memory _blob = StoreSwitch.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Get the full data (using the specified store) */
  function get(IStore _store, bytes32 id) internal view returns (PositionData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    bytes memory _blob = _store.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Set the full data using individual values */
  function set(bytes32 id, bytes32 room, uint32 x, uint32 y) internal {
    bytes memory _data = encode(room, x, y);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    StoreSwitch.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using individual values (using the specified store) */
  function set(IStore _store, bytes32 id, bytes32 room, uint32 x, uint32 y) internal {
    bytes memory _data = encode(room, x, y);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    _store.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using the data struct */
  function set(bytes32 id, PositionData memory _table) internal {
    set(id, _table.room, _table.x, _table.y);
  }

  /** Set the full data using the data struct (using the specified store) */
  function set(IStore _store, bytes32 id, PositionData memory _table) internal {
    set(_store, id, _table.room, _table.x, _table.y);
  }

  /** Decode the tightly packed blob using this table's schema */
  function decode(bytes memory _blob) internal pure returns (PositionData memory _table) {
    _table.room = (Bytes.slice32(_blob, 0));

    _table.x = (uint32(Bytes.slice4(_blob, 32)));

    _table.y = (uint32(Bytes.slice4(_blob, 36)));
  }

  /** Tightly pack full data using this table's schema */
  function encode(bytes32 room, uint32 x, uint32 y) internal view returns (bytes memory) {
    return abi.encodePacked(room, x, y);
  }

  /** Encode keys as a bytes32 array using this table's schema */
  function encodeKeyTuple(bytes32 id) internal pure returns (bytes32[] memory _keyTuple) {
    _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));
  }

  /* Delete all data for given keys */
  function deleteRecord(bytes32 id) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /* Delete all data for given keys (using the specified store) */
  function deleteRecord(IStore _store, bytes32 id) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = bytes32((id));

    _store.deleteRecord(_tableId, _keyTuple);
  }
}
