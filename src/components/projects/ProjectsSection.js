import React from "react";
import styled from "styled-components";
import { config } from "../../config";

export const ProjectsSection = (props) => {
  return (
    <ProjectsContainer>
      <CenterText>I AM THE PROJECTS CONTAINER</CenterText>
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
`;

const CenterText = styled.div`
  text-align: center;
  font-weight: 1000;
`;
