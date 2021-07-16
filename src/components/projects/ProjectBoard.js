import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { Project } from "./Project";
import { ButtonCard, ButtonRow, ProjectContainer } from "./styles";
import update from "immutability-helper";
import { config } from "../../config";
import { useCounter } from "../../hooks/useCounter";
import { UserContext } from "../github/UserProvider";

export const ProjectBoard = (props) => {
  const configs = config();
  const [dynamicProjectCount, setDynamicProjectCount] = useState(0);
  const [projects, setProjects] = useState({
    a: { top: 30, left: 60, lastDropped: 0, title: "Project A" },
    b: { top: 70, left: -20, lastDropped: 1, title: "Project B" },
  });
  const dropCounter = useCounter(Object.keys(projects).length);

  const { user, getRepos, setRepos } = useContext(UserContext);
  const updateProjectsWithRepos = (repos) => {
    var newProjects = {};
    configs.github.displayRepos.forEach((repoName, index) => {
      const project = repos.find((repo) => repo.name === repoName);
      // TODO use update()?
      newProjects = {
        ...newProjects,
        [project.name]: {
          top: 20 + Math.random() * 80,
          left:
            -30 -
            Math.random() * 40 -
            configs.site.projectBoard.cardWidth * index,
          lastDropped: dropCounter(),
          title: project.name,
          url: project.html_url,
          text:
            project.language && `A (primarily) ${project.language} project.`,
          description: project.description,
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
    setDynamicProjectCount(
      dynamicProjectCount + Object.keys(newProjects).length
    );
  };

  useEffect(() => {
    getRepos().then((data) => {
      setRepos(data);
      updateProjectsWithRepos(data);
    });
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const addProject = useCallback(() => {
    setDynamicProjectCount(dynamicProjectCount + 1);
    const project = `dynamicProject${dynamicProjectCount}`;
    setProjects({
      ...projects,
      [project]: {
        top: 10,
        left:
          0 - (configs.site.projectBoard.cardWidth + 32) * dynamicProjectCount,
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
          const { left, top, title, text, description, lastDropped, url } =
            projects[key];
          return (
            <Project
              key={key}
              id={key}
              left={left}
              top={top}
              zIndex={parseInt(lastDropped)}
              bg={colors[colorIndex]}
              clickFn={incrementZ}
              text={text}
              description={description}
              title={title}
              url={url}
            />
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
