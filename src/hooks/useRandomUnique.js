import { useRef } from "react";

export const useRandomUnique = (list, generator) => {
  const choices = useRef(list);
  const taken = useRef([]);
  return () => {
    if (choices.current.length > 0) {
      const choice = choices.current.splice(
        Math.floor(Math.random() * choices.current.length),
        1
      )[0];
      taken.current.push(choice);
      return choice;
    }

    const otherChoice =
      taken.current[Math.floor(Math.random() * taken.current.length)];

    return generator ? generator(otherChoice) : otherChoice;
  };
};
