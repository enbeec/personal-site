import React, { useState } from "react";
import { AboutSection } from "./about/AboutSection";
import { ProjectBoard } from "./projects/ProjectBoard";
import { NavBar } from "./nav/NavBar";

export const MySite = (props) => {
  const [aboutSectionExpanded, setAboutSectionExpanded] = useState(false);
  return (
    <>
      <NavBar />
      <div style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
        <AboutSection
          expandedState={aboutSectionExpanded}
          setExpandedState={setAboutSectionExpanded}
        />
      </div>
      <ProjectBoard watchVars={[aboutSectionExpanded]} />
    </>
  );
};
