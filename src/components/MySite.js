import React, { useState } from "react";
import { AboutSection } from "./about/AboutSection";
import { ProjectBoard } from "./projects/ProjectBoard";
import { StaticBoard } from "./projects/StaticBoard";
import { NavBar } from "./nav/NavBar";
import { UserProvider } from "./github/UserProvider";


export const MySite = (props) => {
  const [aboutSectionExpanded, setAboutSectionExpanded] = useState(false);
  return (
    <>
      <div
        style={{
          // display: "flex",
          // flexFlow: "column",
          height: "100%",
        }}
      >
        <UserProvider>
          <NavBar />
          <AboutSection
            expandedState={aboutSectionExpanded}
            setExpandedState={setAboutSectionExpanded}
          />
          <StaticBoard watchVars={[aboutSectionExpanded]} />
        </UserProvider>
      </div>
    </>
  );
};
