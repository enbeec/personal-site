import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import styled, { css } from "styled-components";
import { config as getConfig } from "../../config";

// see https://github.com/glennflanagan/react-collapsible/blob/develop/example/src/examples/ZeroHeightCollapsible.js
export const AboutSection = (props) => {
  const [config] = useState(getConfig());
  const [githubUser, setGithubUser] = useState();
  const [, setRepos] = useState();

  useEffect(() => {
    fetch(`https://api.github.com/users/${config.github.username}`)
      .then((res) => res.json())
      .then(setGithubUser)
      .then(() => fetch(githubUser?.repos_url))
      .then((res) => res.json())
      .then(console.info)
      .then(setRepos);
  }, [config]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleExpanded = () => {
    props.setExpandedState(!props.expandedState);
  };

  return (
    <AboutContainer>
      <AvatarContainer>
        <AvatarImage
          src={`https://github.com/${config.github.username}.png`}
          alt={`github avatar for user ${config.github.username}`}
        />
      </AvatarContainer>
      <AboutTextContainer>
        <AboutName>
          {config.about.name}
          <span style={{ fontSize: "1rem" }}>
            {" a.k.a. "}
            <a href={`https://github.com/${config.github.username}`}>
              {config.github.username}
            </a>
          </span>
        </AboutName>
        <Collapsible
          onOpen={toggleExpanded}
          onClose={toggleExpanded}
          trigger={
            <AboutText>
              {githubUser && `[${githubUser.location}] `}
              {githubUser && githubUser.bio.replace("|| ", "\r\n")}
              <br /> <AboutTextExpandText />
            </AboutText>
          }
        >
          <AboutText>{config.about.bio}</AboutText>
        </Collapsible>
      </AboutTextContainer>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  background: lavender;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding-top: 2rem;
  padding-bottom: 2rem;
  min-width: 30rem;
  box-shadow: 0px 0px 1px 1px darkgrey;
`;

const AboutTextContainer = styled.div`
  padding-left: 4rem;
  padding-right: 8rem;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  min-width: 27rem;
`;

const AboutName = styled.div`
  font-size: 2rem;
`;

const AboutText = styled.div`
  white-space: pre-wrap;
  font-style: Oblique;
  font-size: 1.1rem;
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}
`;

const AboutTextExpandText = styled.span`
  color: darkgrey;
  margin-left: 4rem;
  margin-right: 4rem;
  ${AboutText}:hover & {
    ::after {
      content: "... click to show/hide...";
    }
  }
`;

const AvatarContainer = styled.div`
  margin-top: 1rem;
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
