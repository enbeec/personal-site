import React from "react";
import styled from "styled-components";
import { config } from "../../config";

export const AboutSection = (props) => {
  return (
    <AboutContainer>
      <img
        src={`https://github.com/${config.github.username}.png`}
        alt={`github avatar for user ${config.github.username}`}
      />
      <AboutTextContainer>
        <AboutName>{config.about.name}</AboutName>
        <AboutBio>{config.about.bio}</AboutBio>
      </AboutTextContainer>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  background: lavender;
  display: flex;
  flex-flow: row;
  justify-content: center;
  margin: 0;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;
const AboutTextContainer = styled.div`
  padding-left: 4rem;
  flex-basis: 60%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
`;
const AboutName = styled.div`
  font-size: 2rem;
`;
const AboutBio = styled.div`
  font-style: Oblique;
  font-size: 1.1rem;
`;
