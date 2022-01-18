import React from "react";
import { FlexBar, BarLink, BarAnchor } from "./styles";

export const NavBar = () => {
    return (
        <FlexBar>
            <BarLink activeClassName={"activeLink"} to={"/"} exact>
                Home
            </BarLink>
            <BarAnchor
                activeClassName={"activeLink"}
                href="https://blog.valcurrie.com"
                target="_blank"
                rel="noreferrer"
            >
                Blog
            </BarAnchor>
        </FlexBar>
    );
};
