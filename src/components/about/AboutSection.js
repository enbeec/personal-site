import React, { useEffect, useState } from "react";
import { config as getConfig } from "../../config";
import {
  AboutContainer,
  AboutText,
  AboutTextContainer,
  AboutName,
  ClickToExpand,
  Avatar,
  TriggerText,
  InsetCollapsible,
} from "./styles";

// see https://github.com/glennflanagan/react-collapsible/blob/develop/example/src/examples/ZeroHeightCollapsible.js
export const AboutSection = ({ expandedState, setExpandedState }) => {
  const [config] = useState(getConfig());
  const [githubUser, setGithubUser] = useState({});
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
    setExpandedState(!expandedState);
  };

  return (
    <AboutContainer>
      <Avatar
        src={`https://github.com/${config.github.username}.png`}
        alt={`github avatar for user ${config.github.username}`}
      />
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
        <InsetCollapsible
          onOpen={toggleExpanded}
          onClose={toggleExpanded}
          trigger={
            <TriggerText>
              {githubUser?.location && `[${githubUser?.location}] `}
              {/* using \r\n depends on css`white-space: pre-wrap` */}
              {githubUser?.bio && githubUser?.bio.replace("|| ", "\r\n")}
              <br /> <ClickToExpand />
            </TriggerText>
          }
        >
          <AboutText>{config.about.bio}</AboutText>
        </InsetCollapsible>
      </AboutTextContainer>
    </AboutContainer>
  );
};
