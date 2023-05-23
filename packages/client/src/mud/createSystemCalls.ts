import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

const entityToBytes32 = (entity: string) => {
  return "0x" + entity.replace("0x", "").padStart(64, "0");
};

export function createSystemCalls(
  { worldSend }: SetupNetworkResult,
  components: ClientComponents
) {

  const acquireItem = async (id: string) => {
    const tx = await worldSend("acquireItem", [
      id.toString(),
    ]);
  };

  const addItemToRoom = async (id: string, x: number, y: number) => {
    const tx = await worldSend("addItemToRoom", [
      entityToBytes32(id),
      x.toString(),
      y.toString(),
    ]);
  };

  const moveRoomItem = async (mudId: string, newX: number, newY: number) => {
    const tx = await worldSend("moveItem", [
      entityToBytes32(mudId),
      newX.toString(),
      newY.toString(),
    ]);
  }

  return {
    acquireItem,
    addItemToRoom,
    moveRoomItem,
  };
}
