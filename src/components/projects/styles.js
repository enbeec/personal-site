import styled from "styled-components";
import { MoveAndShake } from "../../styling/animations";
import { marginX } from "../../styling/helpers";
import { config } from "../../config";

export const ProjectContainer = styled.div`
  cursor: pointer;
  background: linear-gradient(aquamarine 0%, aquamarine 80%, white 100%);
  margin: 0;
  margin-bottom: auto;
  padding-top: 0;
  padding-bottom: 2rem;
  position: absolute;
  min-height: 40rem;
  width: 98%;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0px 2px 2px 2px darkgrey;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  display: flex;
  flex-flow: row;
  font-size: 1.1rem;

  @media only screen and (max-width: 600px) {
    max-width: 600px;
    min-width: 489px;
    width: 100%;
  }
`;

export const ProjectCard = styled.div`
  ${({ isDragging }) => isDragging && MoveAndShake()}
  background: ${(props) => props.bg};
  border-radius: 2px 22px 2px 2px;
  text-align: center;
  /* box-sizing: border-box; */
  box-shadow: 1px 1px 1px 1px darkgrey;
  transition: box-shadow 200ms ease-in-out;
  transition: transform 200ms ease-in-out;
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
  :hover {
    box-shadow: 2px 2px 2px 2px black;
    transform: scale(1.01, 1.01);
  }
  position: relative;
  min-width: ${config().site.projectBoard.cardRemWidth}em;
  max-width: ${config().site.projectBoard.cardRemWidth + 8}em;
  max-height: ${config().site.projectBoard.cardRemHeight}em;
  flex-shrink: 0;
  padding-top: 0;
`;

export const TopBar = styled.div`
  border-radius: 2px 22px 0px 0px;
  font-size: ${(props) => (props.size ? props.size : 0.9)}em;
  background: darkgrey;
  margin: 0;
  padding-left: 5%;
  text-align: left;
  justify-self: flex-start;
  align-self: baseline;
  height: 1.2em;
  width: auto;
  flex-shrink: 0;
  border-spacing: 1px;
  font-style: normal;
`;

export const TextContainer = styled.div`
  padding: 1em;
  font-style: normal;
  padding-top: 0.4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: right;
  padding-right: 0.8em;
`;

const ButtonCardStyled = styled(ProjectCard)`
  margin-top: 0.8em;
  ${marginX("0.4em")}
  cursor: pointer;
  position: relative;
  height: 2.5em;
  width: auto;
  border-radius: 4px;
  background: ${({ bg }) => (bg ? bg : "grey")};

  button {
    cursor: pointer;
    margin: 0.5em;
    padding-right: 1.5em;
    padding-left: 1.5em;
  }
`;

export const ButtonCard = ({ clickFunc, children }) => (
  <ButtonCardStyled>
    <button onClick={clickFunc}>{children}</button>
  </ButtonCardStyled>
);
