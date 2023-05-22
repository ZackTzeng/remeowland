import React from "react";
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
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

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
  return (
    <Container>
      <AppContainer>
        <HeaderDiv>
          <Title>Meowland</Title>
          <Subtitle>Meows x Mud x Magic x More</Subtitle>
        </HeaderDiv>
        <Card>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained">Frens</Button>
            <Button variant="contained">Badges</Button>
            <Button variant="contained">Inventory</Button>
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
            Welcome to your living room. 
            It seems a little bit empty. 
            Care to amplify the ambiance with a feline friend?
            </ScreenDiv>         
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained">Shop Some Goodies!</Button>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>

        </Card>

        <Footer>
          <TextLink href="https://ethglobal.com/events/autonomous">Meowland is with MUD created during Autonomous Worlds. Thank you ETHGlobal.</TextLink>
          {/* Meowland is created with <TextLink href="https://v2.mud.dev">MUD</TextLink> during <TextLink href="https://ethglobal.com/events/autonomous">Autonomous World</TextLink>. Thank you <TextLink href="https://ethglobal.com/">ETHGobal</TextLink>.     */}
        </Footer>
      </AppContainer>
    </Container>
  );
};
