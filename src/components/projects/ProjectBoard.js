import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";
import { Project } from "./Project";
import update from "immutability-helper";

export const ProjectBoard = (props) => {
  // HARDCODED PROJECTS
  // TODO figure out randomization of positions
  /**
   */
  const [projects, setProjects] = useState({
    a: { top: 20, left: 80, title: "Project A" },
    b: { top: 40, left: 20, title: "Project B" },
  });

  const moveProject = useCallback(
    (id, left, top) => {
      setProjects(
        // wtf is this object...
        // 	I need to read the immutability-helper docs
        update(projects, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [projects, setProjects]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "project",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveProject(item.id, left, top);
        // TODO look at the useDrop docs for why this is here
        return undefined;
      },
    }),
    [moveProject]
  );

  return (
    <ProjectContainer ref={drop}>
      {Object.keys(projects).map((key) => {
        const { left, top, title } = projects[key];
        return (
          <Project key={key} id={key} left={left} top={top}>
            {title}
          </Project>
        );
      })}
    </ProjectContainer>
  );
};

const ProjectContainer = styled.div`
  cursor: pointer;
  background: aquamarine;
  margin: 0;
  padding-top: 0;
  padding-bottom: 2rem;
  min-height: 40rem;
  box-shadow: 0px 2px 2px 2px darkgrey;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;
