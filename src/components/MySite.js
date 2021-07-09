import React from "react";
import { AboutSection } from "./about/AboutSection";
import { ProjectBoard } from "./projects/ProjectBoard";
import { NavBar } from "./nav/NavBar";

export const MySite = (props) => {
  return (
    <>
      <NavBar />
      <div style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
        <AboutSection />
      </div>
      <ProjectBoard />
    </>
  );
};
