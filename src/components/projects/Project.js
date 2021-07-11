import React from "react";
import { useDrag } from "react-dnd";
import { ProjectCard } from "./styles";

export const Project = ({ id, left, top, bg, zIndex, children }) => {
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
        <span>{"z-index: " + zIndex}</span>
      </div>
    </ProjectCard>
  );
};
