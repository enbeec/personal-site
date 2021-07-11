import { useState } from "react";

export const useCounter = (initial) => {
  const [_counter, setCounter] = useState(parseInt(initial));
  // QUESTION: do I need to useCallback?
  const counter = () => {
    const newVal = _counter + 1;
    setCounter(newVal);
    return newVal;
  };
  return counter;
};
