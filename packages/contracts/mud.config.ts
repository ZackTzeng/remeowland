import { mudConfig } from "@latticexyz/world/register";
import { resolveTableId } from "@latticexyz/config";

export default mudConfig({
  enums: {
    DecoType: ["None", "Tree", "Food", "Catnip"],
    GiftType: ["None", "Fish"],
    StuffType: ["None", "Poop", "Puke", "Fur"],
    LocationType: ["None", "Inventory", "Room", "Marketplace"],
  },
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    LastVisit: "uint256",
    LastAffinity: "int32",
    AffinityMax: "int32",
    AffinityMin: "int32",
    Cat: {
      keySchema: {
        id: "bytes32",
      },
      schema: {
        totalVisits: "uint32",
      }
    },
    Shelter: {
      keySchema: {
        id: "bytes32",
      },
      schema: {
        total: "uint32",
        uri: "string",
      },
    },
    OwnedBy: "bytes32",
    Location: {
      keySchema: {
        id: "bytes32",
      },
      schema: {
        room: "bytes32",
        locationType: "LocationType",
      }
    },
    Position: {
      keySchema: {
        id: "bytes32"
      },
      schema: {
        room: "bytes32",
        x: "uint32",
        y: "uint32",
      }
    },
    ItemType: {
      keySchema: {
        id: "uint32",
      },
      schema: {
        dCoin: "int32",
        dAffinity: "int32",
        stealable: "bool",
      }
    },
    Item: "uint32",
    Balance: "int32",
    Affinity: "int32",
  },
  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    }
  //   {
  //     name: "KeysInTableModule",
  //     root: true,
  //     args: [resolveTableId("Cat")],
  //   },
  //   {
  //     name: "KeysInTableModule",
  //     root: true,
  //     args: [resolveTableId("Shelter")],
  //   },
  ],
});
