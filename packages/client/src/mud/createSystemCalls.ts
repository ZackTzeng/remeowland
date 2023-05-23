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

  const addItemToRoom = async (id: string, room: string, x: number, y: number) => {
    const tx = await worldSend("addItemToRoom", [
      entityToBytes32(id).toLowerCase(), // TODO do we need to lowercase it
      entityToBytes32(room).toLowerCase(),
      x.toString(),
      y.toString(),
    ]);
  };

  const visitRoom = async (room: string) => {
    const tx = await worldSend("visitRoom", [
      room.toLowerCase()
    ]);
  };

  return {
    acquireItem,
    addItemToRoom,
    visitRoom,
  };
}
