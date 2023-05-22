import React from "react";
import { useState } from "react";
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
} from "./theme";
import Button from '@mui/material/Button';
import { ItemDisplayModal } from "./ItemDisplayModal";

// import { useMUD } from "./MUDContext";
// import { useEntityQuery } from "@latticexyz/react";
// import { Has, getComponentValueStrict } from "@latticexyz/recs";

// const {
//   components: {
    
//   },
//   systemCalls: {

//   },
// } = useMUD();

export const App = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    console.log('handleClose');
    setShow(false);
  }
  const handleOpen = () => {
    console.log('handleOpen');
    setShow(true);
  }

  return (
    <Container>
      <AppContainer>
        <HeaderDiv>
          <Title>Meowland</Title>
          <Subtitle>Meows x Mud x Magic x More</Subtitle>
        </HeaderDiv>
        <Card>
        <Button variant="contained">Frens</Button>
        <Button variant="contained">Badges</Button>
        <Button variant="contained" onClick={handleOpen}>Inventory</Button>
        <Button variant="contained">Marketplace</Button>
        </Card>
        <ItemDisplayModal
          open={show}
          onClose={handleClose}
        />
        <Footer>
          <TextLink href="https://ethglobal.com/events/autonomous">Meowland is with MUD created during Autonomous Worlds. Thank you ETHGlobal.</TextLink>
          {/* Meowland is created with <TextLink href="https://v2.mud.dev">MUD</TextLink> during <TextLink href="https://ethglobal.com/events/autonomous">Autonomous World</TextLink>. Thank you <TextLink href="https://ethglobal.com/">ETHGobal</TextLink>.     */}
        </Footer>
      </AppContainer>
    </Container>
  );
};
