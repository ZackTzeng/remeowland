import { useState, useEffect } from "react";
import { NFT_STORAGE_SHOPITEMS } from "./constants";
import styled, { css } from "styled-components";
import { GenericRoomItem } from "./theme/index";
import Draggable from "react-draggable";
import { useMUD } from "./MUDContext";


type Props = {
  mudId: string;
  itemTypeId: number;
  x: number;
  y: number;
}

export default function RoomItem({mudId, itemTypeId, x, y}: Props) {

  const [locX, setLocX] = useState();
  const [locY, setLocY] = useState();

  const {
    components: {
      Item,
      Position,
      Location,
    },
    systemCalls: {
      moveRoomItem,
    },
    network: { worldContract },
  } = useMUD();

  const [img, setImg] = useState("/assets/default.svg");

  const SpecificRoomItem = styled(GenericRoomItem)`
    left: ${x}px;
    bottom: ${y}px;
    background: url("${img}") no-repeat center;
  `;

  useEffect(() => {
    async function loadData() {
      try {
        const metadataUri = NFT_STORAGE_SHOPITEMS + itemTypeId.toString();
        const response = await fetch(metadataUri);
        const json = await response.json();
        let img = json.image;
        img = img.replace(/ipfs/, "https") + ".ipfs.nftstorage.link";
        setImg(img);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();

  }, []);

  const updateRoomItemPosition = async (e, data) => {
    // try {
    //   await moveRoomItem(moveRoomItem, )
    // // }
    // console.log('x: ', data.x);
    // console.log('y: ', data.y);
    // await moveRoomItem(mudId, data.x, data.y)
  }

  return (
        <div>
          <Draggable
            defaultPosition={{x: 200, y: 400}}
            onStop={updateRoomItemPosition}
          >
            <div>
            <SpecificRoomItem />

            </div>
          </Draggable>
        </div>
    
  );

}