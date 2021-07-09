import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavBar = (props) => {
  return (
    <FlexBar>
      <BarLink activeClassName={"activeLink"} to={"/"} exact>
        Home
      </BarLink>
      <BarLink activeClassName={"activeLink"} to={"/blog"}>
        Blog
      </BarLink>
      <BarLink activeClassName={"activeLink"} to={"/links"}>
        Links
      </BarLink>
    </FlexBar>
  );
};

const FlexBar = styled.div`
  position: sticky;
  z-index: 100;
  top: 0;
  background: lightskyblue;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: flex-end;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  margin: 0;
  box-shadow: 0px 2px 2px 2px darkgrey;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const BarLink = styled(NavLink)`
  background: darkgrey;
  color: black;
  padding-right: 1.2rem;
  padding-left: 1.8rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px black;
  border-top-left-radius: 20px;
  text-decoration: none;

  :link {
    text-decoration: none;
  }
  :visited {
    text-decoration: none;
  }
  cursor: pointer;
  transition: transform 800ms;

  &.activeLink {
    background: lightgrey;

    /* QUESTION can i get this to fire again if the button is clicked? */
    animation: Bounce 840ms ease-out 30;

    @keyframes Bounce {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(5px);
      }
    }
  }
`;
