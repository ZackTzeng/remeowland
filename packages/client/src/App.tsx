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
import GitHubIcon from '@mui/icons-material/GitHub';

export const App = () => {

  const {
    components: {
      Item,
      Position,
      Location,
    },
    systemCalls: {
      visitRoom,
    },
    network: { worldContract },
  } = useMUD();

  const [me, setMe] = useState("");
  const [showInventory, setShowInventory] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showRoomItem, setShowRoomItem] = useState(false);
  const [showEmptyText, setShowEmptyText] = useState(true);
  const [searchText, setSearchText] = useState("Wallet Address");
  const [room, setRoom] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const signer = await worldContract.signer?.getAddress();  
        setMe(signer.toLowerCase());
        setRoom(signer.toLowerCase());
        setSearchText(signer.toLowerCase());
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);
 
  const roomBytes = entityToBytes32(room).toLowerCase();
  const roomItems = useEntityQuery([HasValue(Location, {room: roomBytes, locationType: 2})]);
  
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

  const searchQuery = async () => {
    console.log(`Visiting player ${searchText}`);
    visitRoom(searchText);
    setRoom(searchText);
  }
  
  const validateAndSetSearch = async (room: string) => {
    if (room.length == 42) {
      setSearchText(room.toLowerCase());
    } else {
      setSearchText(me.toLowerCase());
    }
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
          <Title> 
            <a href="https://github.com/ZackTzeng/remeowland" target="_blank"><GitHubIcon /></a>
          </Title>
          <Subtitle>🐾 Meows x MUD = Miracles 🐾</Subtitle>
          
        </HeaderDiv>
        {roomItemObjs.map((roomItemObj) => (
          <RoomItem mudId={roomItemObj.mudId} itemTypeId={roomItemObj.itemTypeId} x={roomItemObj.x} y={roomItemObj.y}  />
        ))}
        <RoomCat id={0} x={100} y={200} showRoomItem={true} />
        <Card>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Button variant="contained">Frens</Button>
            <Button variant="contained">Badges</Button>
            <Button variant="contained" onClick={handleOpenInventory}>Inventory</Button>
          </Grid>
          <Grid item xs={7}>
            <TextField 
              type="search" label="Go to" 
              value={searchText} 
              onInput={(e) => {
                validateAndSetSearch(e.target.value);
              }}
              id="visit" 
              />
            <Button variant="contained" id="search" onClick={searchQuery}>🔍</Button>
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            
            <ScreenDiv>
              {roomItems.length > 0?"":
                `Welcome to ${room == me? "your":room.substring(0,6)} living room. 
                It seems a little bit empty.
                Care to amplify the ambiance somehow?`
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
          room={room}
        />
        <ItemDisplayModal
          open={showShop}
          onClose={handleClose}
          signer={me}
          room={room}
        />
        <Footer>
          <TextLink href="https://ethglobal.com/events/autonomous"> Meowland is with MUD created during Autonomous Worlds. Thank you ETHGlobal. </TextLink>
        </Footer>
      </AppContainer>
    </Container>
  );
};
