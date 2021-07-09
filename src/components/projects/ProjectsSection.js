import React from "react";
import styled from "styled-components";
import { ProjectBoard } from "./ProjectBoard";

export const ProjectsSection = (props) => {
  return (
    <ProjectsContainer>
      <ProjectBoard />
    </ProjectsContainer>
  );
};

const ProjectsContainer = styled.div`
  background: aquamarine;
  margin: 0;
  padding-top: 2rem;
  padding-bottom: 2rem;
  min-height: 40rem;
  box-shadow: 0px 2px 2px 2px darkgrey;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;
