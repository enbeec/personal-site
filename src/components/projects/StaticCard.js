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
  ...props
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

  return (
    <STATIC_CARD
      ref={drag}
      isDragging={isDragging}
      style={{ left, top, zIndex }}
      bg={bg}
      id={id}
      onClick={clickFunc}
	  {...props}
    >
      <TopBar>{title}</TopBar>
      <TextContainer>
        {description && <p style={{ textAlign: "center" }}>{description}</p>}
        {children}
        {typeof text === "string" ? <p children={text} /> : text}
        {url && (
          <button
            style={{ fontSize: "1.3rem", width: "4rem", marginLeft: "80%" }}
            onClick={() => openInNewTab(url)}
            children="Go"
          />
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
  max-width: 30%;
  font-style: normal;

  @media only screen and (max-width: 600px) {
    max-width: 70%;
  }
`;
