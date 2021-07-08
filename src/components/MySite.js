import React from "react";
import { AboutSection } from "./about/AboutSection";
import { ProjectsSection } from "./projects/ProjectsSection";
import { NavBar } from "./nav/NavBar";

export const MySite = (props) => {
  return (
    <>
      <NavBar />
      <div style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
        <AboutSection />
      </div>
      <ProjectsSection />
    </>
  );
};
