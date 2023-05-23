import { useState, useEffect } from "react";
import { NFT_STORAGE_SHOPITEMS } from "./constants";

import styled, { css } from "styled-components";
import { GenericRoomItem } from "./theme/index";
import Draggable from "react-draggable";

type Props = {
  itemid: number;
  x: number;
  y: number;
}

export default function RoomItem({itemid, x, y}: Props) {

  const [img, setImg] = useState("");
  const [roomX, setRoomX] = useState();
  const [roomY, setRoomY] = useState();

  const SpecificRoomItem = styled(GenericRoomItem)`
    left: ${x}px;
    bottom: ${y}px;
    background: url("${img}") no-repeat center;
  `;

  useEffect(() => {
    async function loadData() {
      try {
        const metadataUri = NFT_STORAGE_SHOPITEMS + itemid.toString();
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

  

  return (
    <Draggable>
      <div>
        <SpecificRoomItem />
        
      </div>
      </Draggable>
  );

}