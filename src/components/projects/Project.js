import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { useDrag } from "react-dnd";

export const Project = ({ id, left, top, children }) => {
  // all four of thes colors look groovy with aquamarine
  const colors = ["#DEB8FF", "#F9C453", "#9EB9FF", "#FF9F70"];
  // color is random each render
  const colorIndex = Math.floor(Math.random() * colors.length);

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
    <ProjectCard
      bg={colors[colorIndex]}
      ref={drag}
      isDragging={isDragging}
      style={{ left, top }}
    >
      {children}
    </ProjectCard>
  );
};

const draggingAnimation = css`
  animation: MoveAndShake 1.2s ease infinite;
  @keyframes MoveAndShake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`;

const ProjectCard = styled.div`
  ${({ isDragging }) => isDragging && draggingAnimation}
  background: ${(props) => props.bg};
  border-radius: 2px;
  text-align: center;
  padding: 4rem;
  width: 300px;
  height: 200px;
  box-shadow: 1px 1px 1px 1px darkgrey;
  transition: box-shadow 200ms ease-in-out;
  :hover {
    cursor: pointer;
    box-shadow: 2px 2px 2px 2px black;
  }
  position: relative;
`;
