import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { Project } from "./Project";
import { ButtonRow, ProjectContainer } from "./styles";
import update from "immutability-helper";
import { config } from "../../config";
import { useCounter } from "../../hooks/useCounter";
import { UserContext } from "../github/UserProvider";
import { useRandomUnique } from "../../hooks/useRandomUnique";
import { randomShadeOf } from "../../styling/color";

export const ProjectBoard = (props) => {
  const configs = config();
  const [projects, setProjects] = useState({});

  const randomColor = useRandomUnique(
    ["#DEB8FF", "#F9C453", "#9EB9FF", "#FF9F70"],
    randomShadeOf
  );

  const { user, getRepos, setRepos } = useContext(UserContext);
  const updateProjectsWithRepos = (repos) => {
    var newProjects = {};
    configs.github.displayRepos.forEach((repoName, index) => {
      const project = repos.find((repo) => repo.name === repoName);
      newProjects = {
        ...newProjects,
        [project.name]: {
          top: 20 + Math.random() * 80,
          left:
            Math.random() * 40 - configs.site.projectBoard.cardWidth * index,
          lastDropped: dropCounter(),
          title: project.name,
          url: project.html_url,
          text:
            project.language && `A (primarily) ${project.language} project.`,
          description: project.description,
          bg: randomColor(),
          // eventually maybe something like one of these?
          // isRepo: true,
          // source: "github",
        },
      };
    });
    setProjects({
      ...projects,
      ...newProjects,
    });
  };

  useEffect(() => {
    getRepos().then((data) => {
      setRepos(data);
      updateProjectsWithRepos(data);
    });
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const dropCounter = useCounter(Object.keys(projects).length);

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
          const { bg, left, top, lastDropped, ...proj } = projects[key];
          return (
            <Project
              key={key}
              id={key}
              left={left}
              top={top}
              zIndex={parseInt(lastDropped)}
              bg={bg}
              clickFn={incrementZ}
              proj={proj}
            />
          );
        })}
      </ProjectContainer>
      <ButtonRow>{/*  put buttons here  */}</ButtonRow>
    </>
  );
};
