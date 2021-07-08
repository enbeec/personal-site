import React from "react";
import styled from "styled-components";
import { config } from "../../config";

export const AboutSection = (props) => {
  return (
    <AboutContainer>
      <AvatarContainer>
        <AvatarImage
          src={`https://github.com/${config.github.username}.png`}
          alt={`github avatar for user ${config.github.username}`}
        />
      </AvatarContainer>
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
  align-items: flex-start;
  margin: 0;
  padding-top: 2rem;
  padding-bottom: 2rem;
  min-width: 30rem;
`;

const AboutTextContainer = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  min-width: 27rem;
`;

const AboutName = styled.div`
  font-size: 2rem;
`;

const AboutBio = styled.div`
  font-style: Oblique;
  font-size: 1.1rem;
`;

const AvatarContainer = styled.div`
  margin-top: 4rem;
  margin-left: 2rem;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid #ddd;
  padding: 2px;
  background-color: white;
  max-width: 100%;
  height: auto;
  flex-shrink: 0.6;
  flex-grow: 1;
`;

const AvatarImage = styled.img`
  flex-shrink: inherit;
  display: block;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;
