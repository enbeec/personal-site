import React from "react";
import { useDrag } from "react-dnd";
import { TopBar, TextContainer, ProjectCard } from "./styles";

export const Project = ({
  id,
  left,
  top,
  bg,
  zIndex,
  clickFn,
  children,
  text,
  description,
  title,
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
    <ProjectCard
      ref={drag}
      isDragging={isDragging}
      style={{ left, top, zIndex }}
      bg={bg}
      id={id}
      onClick={clickFn}
    >
      <TopBar>{title}</TopBar>
      <TextContainer>
        <span style={{ fontSize: "1.3rem" }}>{children}</span>
        {text || description ? (
          <>
            {description && <p>{description}</p>}
            {text && <p>{text}</p>}
          </>
        ) : (
          <>
            <p />
            <span>{"top coordinate: " + top}</span>
            <span>{"left coordinate: " + left}</span>
            <span>{"z-index: " + zIndex}</span>
          </>
        )}
      </TextContainer>
    </ProjectCard>
  );
};
