import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Project } from "./Project";
import { ButtonCard, ButtonRow, ProjectContainer } from "./styles";
import update from "immutability-helper";
import { config } from "../../config";
import { useCounter } from "../../hooks/useCounter";

export const ProjectBoard = (props) => {
  const configs = config();
  const [dynamicProjectCount, setDynamicProjectCount] = useState(0);

  const [projects, setProjects] = useState({
    a: { top: 100, left: 60, lastDropped: 0, title: "Project A" },
    b: { top: 40, left: 40, lastDropped: 1, title: "Project B" },
  });

  const dropCounter = useCounter(Object.keys(projects).length);

  const addProject = useCallback(() => {
    setDynamicProjectCount(dynamicProjectCount + 1);
    const project = `dynamicProject${dynamicProjectCount}`;
    setProjects({
      ...projects,
      [project]: {
        top: 10,
        left: 0 - configs.site.projectBoard.cardWidth * dynamicProjectCount,
        lastDropped: dropCounter(),
        title: project,
      },
    });
  }, [projects, setProjects, dynamicProjectCount, configs, dropCounter]);

  const moveProject = useCallback(
    (id, left, top, lastDropped) => {
      setProjects(
        // shorthand way of updating immutable data properly
        update(projects, { [id]: { $merge: { left, top, lastDropped } } })
      );
    },
    [projects, setProjects]
  );

  // useDrop returns collected props (ignored by destructuring here) and
  //    the dropTarget ref which we attach to the container
  const [, drop] = useDrop(
    () => ({
      accept: "project",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveProject(item.id, left, top, dropCounter());
        // TODO look at the useDrop docs for why this is here
        return undefined;
      },
    }),
    [moveProject, dropCounter]
  );

  // QUESTION: does this need to be a useCallback?
  // incrementZ is used to allow bringing a project forward by clicking on it
  const incrementZ = useCallback(
    (e) => {
      setProjects(
        update(projects, {
          [e.currentTarget.id]: { $merge: { lastDropped: dropCounter() } },
        })
      );
    },
    [projects, setProjects, dropCounter]
  );

  return (
    <>
      <ProjectContainer ref={drop}>
        {Object.keys(projects).map((key) => {
          // all four of thes colors look groovy with aquamarine
          const colors = ["#DEB8FF", "#F9C453", "#9EB9FF", "#FF9F70"];
          // random colors on each render for now -- kinda fun :)
          const colorIndex = Math.floor(Math.random() * colors.length);
          // this is so handy
          const { left, top, title, lastDropped } = projects[key];
          return (
            <Project
              key={key}
              id={key}
              left={left}
              top={top}
              zIndex={parseInt(lastDropped)}
              bg={colors[colorIndex]}
              clickFn={incrementZ}
            >
              {/* this is placeholder content */}
              {title}
            </Project>
          );
        })}
      </ProjectContainer>
      <ButtonRow>
        <ButtonCard bg={"grey"} clickFn={addProject}>
          New Project
        </ButtonCard>
      </ButtonRow>
    </>
  );
};
