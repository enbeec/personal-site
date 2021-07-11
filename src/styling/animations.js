import { css } from "styled-components";

export const MoveAndShake = (speed, iterations) => css`
  animation: MoveAndShake ${speed ? speed : "1.12s"} linear
    ${iterations ? iterations : "infinite"};
  @keyframes MoveAndShake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`;

export const Bounce = (speed, iterations) => css`
  animation: Bounce ${speed ? speed : "840ms"} ease-out
    ${iterations ? iterations : "infinite"};
  @keyframes Bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
  }
`;
