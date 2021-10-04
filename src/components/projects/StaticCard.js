import React from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import { TopBar, TextContainer } from "./styles";
import { MoveAndShake } from "../../styling/animations";

export const StaticCard = ({
  id,
  left,
  top,
  bg,
  zIndex,
  clickFunc,
  proj,
  children,
}) => {
  const { text, description, title, url } = proj;
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

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const descriptionParagraphs = description.split("<p>");

  return (
    <STATIC_CARD
      ref={drag}
      isDragging={isDragging}
      style={{ left, top, zIndex }}
      bg={bg}
      id={id}
      onClick={clickFunc}
    >
      <TopBar>{title}</TopBar>
      <TextContainer>
        {children}
        {description &&
          descriptionParagraphs.map((str) => <p children={str} />)}
        {text && <p children={text} />}
        {url && (
          <button
            onClick={() => openInNewTab(url)}
            style={{ justifySelf: "flex-end", alignSelf: "flex-end" }}
          >
            Check it out!
          </button>
        )}
      </TextContainer>
    </STATIC_CARD>
  );
};

const STATIC_CARD = styled.div`
  position: relative;
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
  margin: auto;
  margin-top: 0;
  padding-top: 0;
  flex-shrink: 0;
  box-shadow: 1px 1px 1px 1px darkgrey;
  max-width: 22%;
`;
