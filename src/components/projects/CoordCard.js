import React from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import { TopBar, TextContainer } from "./styles";
import { MoveAndShake } from "../../styling/animations";

export const CoordCard = ({
  id,
  left,
  top,
  bg,
  zIndex,
  clickFunc,
  children,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "project",
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  return (
    <STATIC_CARD
      ref={drag}
      isDragging={isDragging}
      style={{ left, top, zIndex }}
      bg={bg}
      id={id}
      onClick={clickFunc}
    >
      <TopBar />
      <TextContainer>
        <span>{"top coordinate: " + top}</span>
        <span>{"left coordinate: " + left}</span>
        <span>{"z-index: " + zIndex}</span>
      </TextContainer>
    </STATIC_CARD>
  );
};

const STATIC_CARD = styled.div`
  position: relative;
  border: 1px solid black;
  border-radius: 2px 22px 2px 2px;
  ${({ isDragging }) => isDragging && MoveAndShake()}
  :hover {
    box-shadow: 2px 2px 2px 2px black;
    transform: scale(1.01, 1.01);
  }
  transition: box-shadow 200ms ease-in-out;
  transition: transform 200ms ease-in-out;
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
  background: ${(props) => props.bg};
  text-align: center;
  margin: auto;
  margin-top: 0;
  padding-top: 0;
  flex-shrink: 0;
  box-shadow: 1px 1px 1px 1px darkgrey;
`;
