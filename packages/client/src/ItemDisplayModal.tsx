import "./index.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { NUM_SHOPITEMS } from "./constants";
import ItemCard from "./ItemCard";

import { useMUD } from "./MUDContext";
import { useEntityQuery } from "@latticexyz/react";
import { HasValue, getComponentValueStrict } from "@latticexyz/recs";
import { entityToBytes32 } from "./utils";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  isShop?: boolean;
  signer: string;
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

export function ItemDisplayModal({open, onClose, isShop = true, signer}: Props) {

  const {
    components: {
      Item,
      Location,
    },
  } = useMUD();
  
  let items;
  if (isShop) {
    // list out all items 
    items = [...Array(NUM_SHOPITEMS).keys()];
    items = items.map((id) => {
      return {itemType: id, itemId: ""};
    })
  } else {
    try {

      // get it from MUD store
      // TODO fix async so we don't need to hardcode
      // const ids = useEntityQuery([HasValue(Location, {room: entityToBytes32(signer), locationType: 1})]);
      const room = "0x00000000000000000000000016c6b7427fa271a80a80c9936dd21c43d3c4a115";
      items = useEntityQuery([HasValue(Location, {room: room, locationType: 1})]).map((id) => {
        return {itemType: getComponentValueStrict(Item, id).value, itemId: id};
      });
      console.log(items);
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
        <Masonry columns={4} spacing={2}>
          {items.map((i) => (
            <ItemCard id={i.itemType} showPrice={isShop} itemId={i.itemId}> </ItemCard>  
          ))}
        </Masonry>
      </Box>
    </Modal>
  )
}
