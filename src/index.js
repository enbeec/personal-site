import React from "react";
import ReactDOM from "react-dom";
import { MySite } from "./components/MySite";
import { BrowserRouter as Router } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
// import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DndProvider backend={HTML5Backend}>
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
