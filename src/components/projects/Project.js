import React from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import { MoveAndShake } from "../../styling/animations";
import { config } from "../../config";

export const Project = ({ id, left, top, children, noDrag }) => {
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
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>{children}</span>
        <p />
        <span>{"top coordinate: " + top}</span>
        <span>{"left coordinate: " + left}</span>
      </div>
    </ProjectCard>
  );
};

export const ProjectCard = styled.div`
  ${({ isDragging }) => isDragging && MoveAndShake}
  background: ${(props) => props.bg};
  border-radius: 2px;
  text-align: center;
  box-shadow: 1px 1px 1px 1px darkgrey;
  transition: box-shadow 200ms ease-in-out;
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
  :hover {
    box-shadow: 2px 2px 2px 2px black;
  }
  position: relative;
  width: ${config.site.projectBoard.cardRemWidth}rem;
  height: ${config.site.projectBoard.cardRemHeight}rem;
`;
