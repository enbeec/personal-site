import React, { useState } from "react";
import { AboutSection } from "./about/AboutSection";
import { ProjectBoard } from "./projects/ProjectBoard";
import { NavBar } from "./nav/NavBar";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background: white;
    height: 100%;
    padding: 8px;
    /* border: 2px dotted crimson; */
  }
  html {
    overflow-y: hidden;
    height: 100%;
    /* background: black; */
  }
`;

export const MySite = (props) => {
  const [aboutSectionExpanded, setAboutSectionExpanded] = useState(false);
  return (
    <>
      <GlobalStyles />
      <div
        style={{
          // display: "flex",
          // flexFlow: "column",
          height: "100%",
        }}
      >
        <NavBar />
        <div style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
          <AboutSection
            expandedState={aboutSectionExpanded}
            setExpandedState={setAboutSectionExpanded}
          />
        </div>
        <ProjectBoard watchVars={[aboutSectionExpanded]} />
      </div>
    </>
  );
};
