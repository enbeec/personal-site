import styled from "styled-components";
import { MoveAndShake } from "../../styling/animations";
import { config } from "../../config";

export const ProjectCard = styled.div`
  ${({ isDragging }) => isDragging && MoveAndShake()}
  background: ${(props) => props.bg};
  border-radius: 2px;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 1px 1px 1px 1px darkgrey;
  transition: box-shadow 200ms ease-in-out;
  transition: transform 200ms ease-in-out;
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
  :hover {
    box-shadow: 2px 2px 2px 2px black;
    transform: scale(1.01, 1.01);
  }
  /* position: relative; */
  position: absolute;
  width: ${config().site.projectBoard.cardRemWidth}rem;
  height: ${config().site.projectBoard.cardRemHeight}rem;
`;

export const ProjectContainer = styled.div`
  cursor: pointer;
  background: aquamarine;
  margin: 0;
  padding-top: 0;
  padding-bottom: 2rem;
  min-height: 40rem;
  box-sizing: border-box;
  box-shadow: 0px 2px 2px 2px darkgrey;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

export const ButtonCard = styled.div``;
