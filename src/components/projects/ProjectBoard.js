import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { Project } from "./Project";
import { ProjectCard, ProjectContainer } from "./styles";
import update from "immutability-helper";
import { config } from "../../config";
import { useRect } from "../../hooks/useRect";

export const ProjectBoard = (props) => {
  const [rect, sizeRef] = useRect(
    props.watchVars ? props.watchVars : undefined
  );

  const configs = config();
  const [dynamicProjectCount, setDynamicProjectCount] = useState(0);

  const [projects, setProjects] = useState({
    a: { top: 0, left: 0, title: "Project A" },
    b: { top: 40, left: 40, title: "Project B" },
  });

  const addProject = useCallback(() => {
    setDynamicProjectCount(dynamicProjectCount + 1);
    const project = `dynamicProject${dynamicProjectCount}`;
    setProjects({
      ...projects,
      [project]: {
        top: 10,
        left: 50 - configs.site.projectBoard.cardWidth * dynamicProjectCount,
        title: project,
      },
    });
  }, [projects, setProjects, dynamicProjectCount]);

  const moveProject = useCallback(
    (id, left, top) => {
      setProjects(
        // shorthand way of updating immutable data properly
        update(projects, { [id]: { $merge: { left, top } } })
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
        // TODO clamping
        moveProject(item.id, left, top);
        // TODO look at the useDrop docs for why this is here
        return undefined;
      },
    }),
    [moveProject]
  );

  return (
    <div ref={sizeRef}>
      <ProjectContainer ref={drop}>
        {Object.keys(projects).map((key) => {
          // all four of thes colors look groovy with aquamarine
          const colors = ["#DEB8FF", "#F9C453", "#9EB9FF", "#FF9F70"];
          // random colors on each render for now
          const colorIndex = Math.floor(Math.random() * colors.length);
          const { left, top, title } = projects[key];
          return (
            <Project
              key={key}
              id={key}
              // convert stored relative coords to absolute coords
              left={left}
              top={top}
              bg={colors[colorIndex]}
            >
              {title}
            </Project>
          );
        })}
        {/* TODO extend ProjectCard the right way */}
        <ProjectCard
          style={{
            position: "fixed",
            bottom: 15,
            left: 15,
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
      </ProjectContainer>
    </div>
  );
};
