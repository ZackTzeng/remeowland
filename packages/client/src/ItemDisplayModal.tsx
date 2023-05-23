import "./index.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { NUM_SHOPITEMS } from "./constants";
import ItemCard from "./ItemCard";
import Draggable from 'react-draggable';

import { useMUD } from "./MUDContext";
import { useEntityQuery } from "@latticexyz/react";
import { HasValue } from "@latticexyz/recs";
import { entityToBytes32 } from "./utils";

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
  } else {
    // get it from MUD store
    items = useEntityQuery([HasValue(Location, {room: entityToBytes32(signer), locationType: 1})]);
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        <Masonry columns={4} spacing={2}>
          {items.map((i) => (
            <ItemCard id={i} showPrice={isShop}> </ItemCard>  
          ))}
        </Masonry>
      </Box>
    </Modal>
  )
}
