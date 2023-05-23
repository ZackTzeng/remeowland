import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import {
  AppContainer,
  Container,
  Card,
  HeaderDiv,
  Subtitle,
  Title,
  Footer,
  TextLink,
  ScreenDiv,
} from "./theme";
import Button from '@mui/material/Button';
import { ItemDisplayModal } from "./ItemDisplayModal";
import RoomItem from "./RoomItem";
import RoomCat from "./RoomCat";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import { Entity } from "@latticexyz/recs";
import { useMUD } from "./MUDContext";
import { useEntityQuery } from "@latticexyz/react";
import { runQuery, Has, HasValue, getComponentValueStrict } from "@latticexyz/recs";
import { entityToBytes32 } from "./utils";

export const App = () => {

  const {
    components: {
      Item,
      Position,
      Location,
    },
    network: { worldContract },
  } = useMUD();

  const [me, setMe] = useState("");
  const [showInventory, setShowInventory] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showRoomItem, setShowRoomItem] = useState(false);
  const [showEmptyText, setShowEmptyText] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const signer = await worldContract.signer?.getAddress();  
        setMe(signer);
      } catch (err) {
        console.error(err);
      }

    }

    loadData();
  }, [worldContract.signer]);
 
  const room = entityToBytes32(me).toLowerCase();
  const roomItems = useEntityQuery([HasValue(Location, {room: room, locationType: 2})]);
  
  const handleClose = () => {
    setShowInventory(false);
    setShowShop(false);
  }
  const handleOpenInventory = () => {
    setShowInventory(true);
  }
  const handleOpenShop = () => {
    setShowShop(true);
  }
  const hideEmptyText = () => {
    setShowEmptyText(false);
  }
  // const displayEmptyText = () => {
  //   setShowEmptyText(true);
  // }

  function RoomItemCallback() {

  }

  type Results = {
    mudId: string;
    itemTypeId: number;
    x: number;
    y: number;
  }

  let roomItemObjs: Results[];
  roomItemObjs = roomItems.map((itemId) => {
    let position = getComponentValueStrict(Position, itemId)
    let itemTypeId = getComponentValueStrict(Item, itemId).value
    return {mudId: itemId, itemTypeId: itemTypeId, x: position.x, y: position.y}
  })

  console.log('roomItems:', roomItems)
  let positions = roomItems.map((itemId) => {
    return getComponentValueStrict(Position, itemId);
  })
  console.log('position', positions)
 


  return (
    <Container>
      <AppContainer>
        <HeaderDiv>
          <Title>Meowland</Title>
          <Subtitle>Meows x Mud x Magic x More</Subtitle>
        </HeaderDiv>
        {roomItemObjs.map((roomItemObj) => (
          <RoomItem mudId={roomItemObj.mudId} itemTypeId={roomItemObj.itemTypeId} x={roomItemObj.x} y={roomItemObj.y}  />
        ))}
        <RoomCat id={0} x={0} y={0} showRoomItem={true} />
        <Card>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained">Frens</Button>
            <Button variant="contained">Badges</Button>
            <Button variant="contained" onClick={handleOpenInventory}>Inventory</Button>
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={4}>
            {/* <TextField fullWidth label="visit room" id="visit" /> */}
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            
            <ScreenDiv>
              {roomItems.length > 0?"":
                `Welcome to your living room. 
                It seems a little bit empty.
                Care to amplify the ambiance with a feline friend?`
              }
            </ScreenDiv>         
            
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={handleOpenShop}>Shop Some Goodies!</Button>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
          
        </Card>
        <ItemDisplayModal
          open={showInventory}
          onClose={handleClose}
          isShop={false}
          signer={me}
        />
        <ItemDisplayModal
          open={showShop}
          onClose={handleClose}
          signer={me}
        />
        <Footer>
          <TextLink href="https://ethglobal.com/events/autonomous">Meowland is with MUD created during Autonomous Worlds. Thank you ETHGlobal.</TextLink>
          {/* Meowland is created with <TextLink href="https://v2.mud.dev">MUD</TextLink> during <TextLink href="https://ethglobal.com/events/autonomous">Autonomous World</TextLink>. Thank you <TextLink href="https://ethglobal.com/">ETHGobal</TextLink>.     */}
        </Footer>
      </AppContainer>
    </Container>
  );
};
