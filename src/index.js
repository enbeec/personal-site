import React from "react";
import ReactDOM from "react-dom";
import { MySite } from "./components/MySite";
import { BrowserRouter as Router } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";
import Marquee from "react-fast-marquee";
// import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import RoutedGothic from "./fonts/routed-gothic.ttf";
import RoutedGothicItalic from "./fonts/routed-gothic-italic.ttf";
import RoutedGothicHalfItalic from "./fonts/routed-gothic-half-italic.ttf";
import RoutedGothicWide from "./fonts/routed-gothic-wide.ttf";

const GlobalStyles = createGlobalStyle`
	@font-face {
		font-family: RoutedGothic;
		src: url(${RoutedGothic});
	font-style: normal;
	}

	@font-face {
		font-family: RoutedGothic;
		src: url(${RoutedGothicItalic});
		font-style: italic;
	}

	@font-face {
		font-family: RoutedGothic;
		src: url(${RoutedGothicHalfItalic});
		font-style: oblique;
	}

	@font-face {
		font-family: RoutedGothic;
		src: url(${RoutedGothicWide}) format("truetype");
		font-style: 'wide';
	}

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

	div, p, button, input, select {
		font-family: RoutedGothic;
	}


`;

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {isMobile.any() && (
        <Marquee gradientWidth={20} speed={60} delay={2}>
          <span style={{ marginRight: "4rem" }} />
          <span style={{ marginRight: "2rem", color: "black" }}>
            mobile site is under construction
          </span>
          <span style={{ marginRight: "2rem", color: "red" }}>
            touch dragging is experimental
          </span>
          <span style={{ marginRight: "2rem", color: "red" }}>
            the mobile layout is nonexistent
          </span>
        </Marquee>
      )}
      <DndProvider backend={isMobile.any() ? TouchBackend : HTML5Backend}>
        <GlobalStyles />
        <MySite />
      </DndProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
