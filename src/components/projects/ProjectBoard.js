import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";
import { Project, ProjectCard } from "./Project";
import update from "immutability-helper";
import { useWindowWidth } from "@react-hook/window-size";
import { config } from "../../config";

/**
 * DRAG AND DROP (aka DND) PRIMER:
 * lol fuck this im rewriting it with absolute posititons
 */

export const ProjectBoard = (props) => {
  // HARDCODED PROJECTS
  // TODO figure out randomization of positions
  /**
   */
  const [projects, setProjects] = useState({
    a: { top: 20, left: 180, title: "Project A" },
    b: { top: 40, left: 120, title: "Project B" },
  });

  const boardWidth = useWindowWidth();
  const convertRemToPixels = (rem) => {
    return rem * parseFloat(getComputedStyle(document.body).fontSize);
  };

  const randomLeft = useCallback(
    () =>
      Math.random() *
      (boardWidth - convertRemToPixels(config.site.projectBoard.cardRemWidth)),
    [boardWidth]
  );

  // every time we add a project the relative top needs to go down
  //  I want that behavior separate from randomTop
  const [dynamicPostsCount, setDynamicPostsCount] = useState(0);

  const zeroTop = useCallback(() => {
    return (
      0 -
      dynamicPostsCount *
        convertRemToPixels(config.site.projectBoard.cardRemHeight)
    );
  }, [dynamicPostsCount]);

  const randomTop = useCallback(
    () => Math.random() * zeroTop(),
    [dynamicPostsCount]
  );

  const addProject = useCallback(() => {
    setDynamicPostsCount(dynamicPostsCount + 1);
    const project = `dynamicProject${dynamicPostsCount}`;
    setProjects({
      ...projects,
      [project]: { top: randomTop(), left: randomLeft(), title: project },
    });
  }, [projects, setProjects, setDynamicPostsCount]);

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
      {/* TODO extend ProjectCard the right way */}
      <ProjectCard
        style={{
          position: "fixed",
          bottom: 5,
          background: "grey",
          height: "2.5rem",
          width: "10rem",
          cursor: "copy",
        }}
      >
        <button
          onClick={addProject}
          style={{
            margin: "0.5rem",
            paddingRight: "1.5rem",
            paddingLeft: "1.5rem",
          }}
        >
          New Project
        </button>
      </ProjectCard>
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
