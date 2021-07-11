import React from "react";
import { FlexBar, BarLink } from "./styles";

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
