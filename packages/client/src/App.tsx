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

  useEffect(() => {
    async function loadData() {
      try {
        const signer = await worldContract.signer?.getAddress();  
        setMe(signer);
        setSearchText(signer.toLowerCase());
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, [worldContract.signer]);
 
  const room = entityToBytes32(me).toLowerCase();
  const roomItems = useEntityQuery([HasValue(Location, {room: room, locationType: 2})]);
  
  const handleClose = () => {
    console.log('handleClose');
    setShowInventory(false);
    setShowShop(false);
  }
  const handleOpenInventory = () => {
    console.log('handleOpenInventory');
    setShowInventory(true);
  }
  const handleOpenShop = () => {
    console.log('handleOpenShop');
    setShowShop(true);
  }
  const hideEmptyText = () => {
    console.log('hide empty text');
    setShowEmptyText(false);
  }

  function RoomItemCallback() {

  }

  const searchQuery = async () => {
    console.log(`Visiting player ${searchText}`);
    visitRoom(searchText);
    setMe(searchText);
  }
  
  const validateAndSetSearch = async (room: string) => {
    if (room.length == 42) {
      setSearchText(room.toLowerCase());
    } else {
      setSearchText(me.toLowerCase());
    }
  }


  return (
    <Container>
      <AppContainer>
        <HeaderDiv>
          <Title>Meowland</Title>
          <Subtitle>Meows x Mud x Magic x More</Subtitle>
        </HeaderDiv>
        <Card>
        <RoomItem id={1} x={10} y={0}  />
        <RoomCat id={0} x={0} y={0} showRoomItem={true} />
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
              {showEmptyText?"":
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
