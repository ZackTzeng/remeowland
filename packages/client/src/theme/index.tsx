import styled, { css } from "styled-components";

export const FlexContainer = styled.div<{
  direction?: string;
  alignItems?: string;
  justifyContent?: string;
  padding?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  align-items: ${(props) => props.alignItems || "stretch"};
  justify-content: ${(props) => props.justifyContent || "space-between"};
  padding: ${(props) => props.padding || "0px"};
  gap: ${(props) => props.gap || "0px"};
`;

export const Container = styled.div`
  background: #293347;
  height: 100vh;
  overflow: hidden;
  ${FlexContainer};
  font-family: 'Press Start 2P', sans-serif;
`;

export const AppContainer = styled(FlexContainer)`
  height: 100%;
  box-sizing: border-box;
  padding: 48px;
  justify-content: start;
`;

export const HeaderDiv = styled(FlexContainer)`
  gap: 4px;
`;

export const ScreenDiv = styled(FlexContainer)`

  font-family: 'Press Start 2P', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 64px;

  text-align: center;
  letter-spacing: -0.05em;

  color: #293347;

`;

export const GenericRoomItem = styled.div`
  position: absolute;

  height: 300px;
  width: 300px;
  object-fit: cover;
  z-index: 2;
`;

export const GenericRoomCat = styled.div`
  position: absolute;

  height: 150px;
  width: 150px;
  object-fit: cover;
  z-index: 2;
`;

export const Title = styled.span`
  color: #E4E2D7;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
`;

export const Subtitle = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.6);
`;

export const Card = styled.div`
  color: white;
  width: 960px;
  height: 600px;
  border: 1px solid #3e444e;
  border-radius: 4px;
  ${FlexContainer};
  padding: 16px;
  gap: 16px;
  margin-top: 1rem;
  background: url("/assets/room.png") no-repeat center;
  background-size: contain;
`;

export const FormFieldWrapper = styled(FlexContainer)`
  flex-direction: row;
  padding: 0px;
  gap: 12px;
  width: 100%;
`;

export const FormField = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;
  gap: 8px;
  background: #C292FF;
  border: 1px solid #3E444E;
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 1;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);

  &:valid {
    color: rgba(255, 255, 255);
  }
`;

export const FormButton = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background: #fC292FF;
  border: 1px solid #3E444E;
  border-radius: 4px;
  cursor: pointer;
`;


export const Button = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background: #C292FF;
  color: #293347;
  border: 1px solid #293347;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 5px 5px #FFE0BF;
`;


export const Footer = styled(FlexContainer)`
  flex-direction: row;
  gap: 12px;
  margin-top: 1rem;
`;

export const TextLink = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
`;
