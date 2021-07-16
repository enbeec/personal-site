import React, { useContext, useEffect, useState } from "react";
import { config as getConfig } from "../../config";
import Collapsible from "react-collapsible";
import {
  AboutContainer,
  AboutText,
  AboutTextContainer,
  AboutName,
  ClickToExpand,
  Avatar,
  TriggerText,
  InsetBorder,
} from "./styles";
import { UserContext } from "../github/UserProvider";

// see https://github.com/glennflanagan/react-collapsible/blob/develop/example/src/examples/ZeroHeightCollapsible.js
export const AboutSection = ({ expandedState, setExpandedState }) => {
  const [config] = useState(getConfig());
  const { user, setUser, getUser } = useContext(UserContext);

  useEffect(() => {
    getUser().then((user) => setUser(user));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <InsetBorder>
          <Collapsible
            onOpen={toggleExpanded}
            onClose={toggleExpanded}
            trigger={
              <TriggerText>
                {user?.location && `[${user?.location}] `}
                {/* using \r\n depends on css`white-space: pre-wrap` */}
                {user?.bio && user?.bio.replace("|| ", "\r\n")}
                <br />
                <ClickToExpand>
                  {expandedState
                    ? "...click to collapse..."
                    : "...click to expand..."}
                </ClickToExpand>
              </TriggerText>
            }
          >
            <AboutText>{config.about.bio}</AboutText>
          </Collapsible>
        </InsetBorder>
      </AboutTextContainer>
    </AboutContainer>
  );
};
