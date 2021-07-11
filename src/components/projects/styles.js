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
`;

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
  position: relative;
  width: ${config().site.projectBoard.cardRemWidth}rem;
  height: ${config().site.projectBoard.cardRemHeight}rem;
  flex-shrink: 0;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: right;
  padding-right: 0.8rem;
`;

const _ButtonCard = styled(ProjectCard)`
  margin-top: 0.8rem;
  ${marginX("0.4rem")}
  cursor: pointer;
  position: relative;
  height: 2.5rem;
  width: auto;
  border-radius: 4px;
  background: ${({ bg }) => (bg ? bg : "grey")};

  button {
    cursor: pointer;
    margin: 0.5rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
`;

export const ButtonCard = ({ clickFn, children }) => (
  <_ButtonCard>
    <button onClick={clickFn}>{children}</button>
  </_ButtonCard>
);
