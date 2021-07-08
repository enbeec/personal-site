import React from "react";
import styled from "styled-components";
import { config } from "../../config";

export const AboutSection = (props) => {
  return (
    <>
      <img
        src={`https://github.com/${config.github.username}.png`}
        alt={`github avatar for user ${config.github.username}`}
      />
      <AboutName>{config.about.name}</AboutName>
      <AboutBio>{config.about.bio}</AboutBio>
    </>
  );
};

const AboutName = styled.div``;
const AboutBio = styled.div``;
