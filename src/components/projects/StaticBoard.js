import React, { useState, useCallback } from "react";
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

  const [cards, setCards] = useState({
    github: {
      top: 20,
      left: 20,
      lastDropped: 14,
      title: "My GitHub",
      url: "https://github.com/enbeec",
      description: `Check out my Nashville Software School capstones: `,
      children: (
        <ul style={{ marginTop: "0rem" }}>
          <li>
            The ResumeBook (
            <button to="https://github.com/enbeec/theresumebook">Client</button>
            )
          </li>
          <li>
            RGBlent (
            <button to="https://github.com/enbeec/rgblent-client">
              client
            </button>{" "}
            and{" "}
            <button to="https://github.com/enbeec/rgblent-server">
              server
            </button>
            )
          </li>
        </ul>
      ),
      bg: "#DEB8FF",
    },
    0: { top: 60, left: 60, lastDropped: 15, bg: "#9EB9FF" },
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
      {process.env.NODE_ENV !== "production" && (
        <CoordCard
          id={0}
          left={cards[0].left}
          top={cards[0].top}
          zIndex={parseInt(cards[0].lastDropped)}
          bg={cards[0].bg}
          clickFunc={incrementZ}
        />
      )}
    </ProjectContainer>
  );
};
