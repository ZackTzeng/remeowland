import { useState, useEffect } from "react";
import { NFT_STORAGE_SHOPITEMS } from "./constants";
import styled, { css } from "styled-components";
import { GenericRoomItem } from "./theme/index";
import Draggable from "react-draggable";



type Props = {
  mudId: string;
  itemTypeId: number;
  x: number;
  y: number;
}

export default function RoomItem({mudId, itemTypeId, x, y}: Props) {

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

  

  return (
        <div>
          <Draggable
            defaultPosition={{x: 200, y: 400}}
          >
            <div>
            <SpecificRoomItem />

            </div>
          </Draggable>
        </div>
    
  );

}