import { useState } from "react";
import "./index.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { NUM_SHOPITEMS } from "./constants";
import ItemCard from "./ItemCard";

type Props = {
  open: boolean;
  onClose: () => void;
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function ItemDisplayModal({open, onClose}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        <Masonry columns={4} spacing={2}>
          {[...Array(NUM_SHOPITEMS).keys()].map((i) => (
            <ItemCard id={i}> </ItemCard>  
          ))}
        </Masonry>
      </Box>
    </Modal>
  )
}
