import React from "react";
import { useDrag } from "react-dnd";
import { ProjectCard } from "./styles";

export const Project = ({ id, left, top, bg, zIndex, clickFn, children }) => {
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
      ref={drag}
      isDragging={isDragging}
      style={{ left, top, zIndex }}
      bg={bg}
      id={id}
      onClick={clickFn}
    >
      {/* this div and it's contents are placeholders */}
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: "1.3rem" }}>{children}</span>
        <p />
        <span>{"top coordinate: " + top}</span>
        <span>{"left coordinate: " + left}</span>
        <span>{"z-index: " + zIndex}</span>
      </div>
    </ProjectCard>
  );
};
