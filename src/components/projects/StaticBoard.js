import React, { useState, useCallback } from "react";
import styled from "styled-components";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import { Project } from "./Project";
import { StaticCard } from "./StaticCard";
import { CoordCard } from "./CoordCard";
import { useCounter } from "../../hooks/useCounter";
import { useRandomUnique } from "../../hooks/useRandomUnique";
import { randomShadeOf } from "../../styling/color";
import { ButtonRow, ProjectContainer } from "./styles";

export const StaticBoard = (props) => {
  const dropCounter = useCounter(16);
  // ["#DEB8FF", "#F9C453", "#9EB9FF", "#FF9F70"]
  //
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const openRepo = (repoName) =>
    openInNewTab(`https://github.com/enbeec/${repoName}`);

  const RGBlentScreenShotDemo =
    "https://vcvcvc-dev.us-east-1.linodeobjects.com/rgblent-1-demoday-screenshot.png";
  const LissaDemoCroppedGIF =
    "https://vcvcvc-dev.us-east-1.linodeobjects.com/lissa-demo-cropped.gif";

  const TheResumeBook =
    "https://vcvcvc-dev.us-east-1.linodeobjects.com/theresumebook.png";
  const RGBlentScreenShot =
    "https://vcvcvc-dev.us-east-1.linodeobjects.com/rgblent-1.1-with-sidebar.png";

  const [cards, setCards] = useState({
    lissaDemo: {
      top: -120,
      left: 160,
      lastDropped: 16,
      bg: "#F9C453",
      title: "Lissajous Scales Demo",
      description: "Teensy 3.6 + OLED Arduino sketch",
      text: "one big C++ file named .ino",
      children: <img src={LissaDemoCroppedGIF} />,
      url: "https://github.com/enbeec/lissajous-demo",
    },
    rgblentV1: {
      top: -1830,
      left: 50,
      lastDropped: 17,
      bg: "#e8e9c2",
      title: "RGBlent Version 1.0",
      text: (
        <FlexRow>
          <span>"circa (CIELAB) 2021"</span>
          <button disabled={true}>Coming Soon!</button>
        </FlexRow>
      ),
      children: (
        <img
          src={RGBlentScreenShot}
          style={{
            width: "100%",
          }}
        />
      ),
    },
    rgblentDemo: {
      top: -800,
      left: 140,
      lastDropped: 15,
      bg: "#9EB9FF",
      title: "RGBlent Demo",
      description: "a 2 week sprint to MVP",
      text: "shouts out to all my fellow NSS Cohort 48 pals!",
      children: (
        <img
          src={RGBlentScreenShotDemo}
          style={{
            width: "100%",
          }}
        />
      ),
    },
    theResumeBook: {
      top: -490,
      left: -170,
      lastDropped: 14,
      bg: "#a8a9ff",
      title: "The ResumeBook",
      description: "My first React project!",
      text: 'Sorry, we\'re keeping the"the".',
      children: <img src={TheResumeBook} style={{ width: "100%" }} />,
    },
    github: {
      top: 20,
      left: -40,
      lastDropped: 14,
      bg: "#DEB8FF",
      title: "My GitHub",
      url: "https://github.com/enbeec",
      description: `Check out my Nashville Software School capstones: `,
      children: (
        <ul style={{ marginTop: "0rem" }}>
          <li>
            The ResumeBook (
            <button onClick={() => openRepo("theresumebook")}>Client</button>)
          </li>
          <li>
            RGBlent (
            <button onClick={() => openRepo("rgblent-client")}>Client</button>{" "}
            and{" "}
            <button onClick={() => openRepo("rgblent-server")}>Server</button>)
          </li>
        </ul>
      ),
    },
    0: { top: 0, left: 0, lastDropped: 15, bg: "#9EB9FF" },
  });

  const moveCard = useCallback(
    (id, left, top, lastDropped) => {
      setCards(
        // shorthand way of updating immutable data properly
        update(cards, { [id]: { $merge: { left, top, lastDropped } } })
      );
    },
    [cards, setCards]
  );

  // useDrop returns collected props (ignored by destructuring here) and
  //    the dropTarget ref which we attach to the container
  const [, drop] = useDrop(
    () => ({
      accept: "project",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveCard(item.id, left, top, dropCounter());
        // TODO look at the useDrop docs for why this is here
        return undefined;
      },
    }),
    [moveCard, dropCounter]
  );

  // incrementZ is used to allow bringing a project forward by clicking on it
  const incrementZ = useCallback(
    (e) => {
      setCards(
        update(cards, {
          [e.currentTarget.id]: { $merge: { lastDropped: dropCounter() } },
        })
      );
    },
    [cards, setCards, dropCounter]
  );

  return (
    <ProjectContainer ref={drop}>
      {process.env.NODE_ENV !== "production" && (
        <CoordCard
          id={0}
          left={cards[0].left}
          top={cards[0].top}
          zIndex={parseInt(cards[0].lastDropped)}
          bg={cards[0].bg}
          clickFunc={incrementZ}
          title="start"
        />
      )}
      <StaticCard
        id="github"
        left={cards.github.left}
        top={cards.github.top}
        zIndex={parseInt(cards.github.lastDropped)}
        bg={cards.github.bg}
        clickFunc={incrementZ}
        proj={cards.github}
        children={cards.github.children}
      />
      <StaticCard
        id="lissaDemo"
        left={cards.lissaDemo.left}
        top={cards.lissaDemo.top}
        zIndex={parseInt(cards.lissaDemo.lastDropped)}
        bg={cards.lissaDemo.bg}
        clickFunc={incrementZ}
        proj={cards.lissaDemo}
        children={cards.lissaDemo.children}
        onDoubleClick={() => openInNewTab(LissaDemoCroppedGIF)}
      />
      <StaticCard
        id="theResumeBook"
        left={cards.theResumeBook.left}
        top={cards.theResumeBook.top}
        zIndex={parseInt(cards.theResumeBook.lastDropped)}
        bg={cards.theResumeBook.bg}
        clickFunc={incrementZ}
        proj={cards.theResumeBook}
        children={cards.theResumeBook.children}
        onDoubleClick={() => openInNewTab(TheResumeBook)}
      />
      <StaticCard
        id="rgblentDemo"
        left={cards.rgblentDemo.left}
        top={cards.rgblentDemo.top}
        zIndex={parseInt(cards.rgblentDemo.lastDropped)}
        bg={cards.rgblentDemo.bg}
        clickFunc={incrementZ}
        proj={cards.rgblentDemo}
        children={cards.rgblentDemo.children}
        onDoubleClick={() => openInNewTab(RGBlentScreenShotDemo)}
      />
      <StaticCard
        id="rgblentV1"
        left={cards.rgblentV1.left}
        top={cards.rgblentV1.top}
        zIndex={parseInt(cards.rgblentV1.lastDropped)}
        bg={cards.rgblentV1.bg}
        clickFunc={incrementZ}
        proj={cards.rgblentV1}
        children={cards.rgblentV1.children}
        onDoubleClick={() => openInNewTab(RGBlentScreenShot)}
      />

      {process.env.NODE_ENV !== "production" && (
        <CoordCard
          id={0}
          left={cards[0].left}
          top={cards[0].top}
          zIndex={parseInt(cards[0].lastDropped)}
          bg={cards[0].bg}
          clickFunc={incrementZ}
          title="end"
        />
      )}
    </ProjectContainer>
  );
};

const FlexRow = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 1rem;
  justify-content: space-around;
`;
