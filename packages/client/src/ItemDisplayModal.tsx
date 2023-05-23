import "./index.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { NUM_SHOPITEMS } from "./constants";
import { ItemCard } from "./ItemCard";

import { useMUD } from "./MUDContext";
import { useEntityQuery } from "@latticexyz/react";
import { HasValue, getComponentValueStrict } from "@latticexyz/recs";
import { entityToBytes32 } from "./utils";
import { useEffect } from "react";

import{ ScreenDiv } from "./theme";

type Props = {
  open: boolean;
  onClose: () => void;
  isShop?: boolean;
  signer: string;
  room: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  minHeight: 393,
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function ItemDisplayModal({open, onClose, isShop = true, signer, room}: Props) {

  const {
    components: {
      Item,
      Location,
    },
  } = useMUD();
  
  type Results = {
    itemType: number;
    itemId: string;
  }

  let items : Results[];
  if (isShop) {
    // list out all items 
    const idTypes = [...Array(NUM_SHOPITEMS).keys()];
    items = idTypes.map((id) => {
      return {itemType: id, itemId: ""};
    })
  } else {
    try {       
      const wallet = entityToBytes32(signer).toLowerCase();
      const idTypes = useEntityQuery([HasValue(Location, {room: wallet, locationType: 1})]);
      
      items = idTypes.map((id) => {
        return {itemType: getComponentValueStrict(Item, id).value, itemId: id};
      });
      
    } catch(error) {
      console.log(error);
      items = [];
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        {items.length > 0 ?
        <Masonry columns={4} spacing={2}>
          {items.map((i) => (
            <ItemCard id={i.itemType} itemId={i.itemId} showPrice={isShop} room={room}> </ItemCard>  
          ))}
        </Masonry>
        :
        <ScreenDiv>
          🐱Nothing here yet...🐱
        </ScreenDiv>
        }
      </Box>
    </Modal>
  )
}
