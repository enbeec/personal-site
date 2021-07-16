export const randomShadeOf = (hexColor) => {
  var r = parseInt(hexColor.slice(1, 3), 16);
  var g = parseInt(hexColor.slice(3, 5), 16);
  var b = parseInt(hexColor.slice(5, 7), 16);

  const scale = highScale();

  // if any color goes above 255, return 255 instead
  // you can do the same with Math.max and 0 for a lower bound
  r = Math.min(Math.floor(r * scale), 255);
  g = Math.min(Math.floor(g * scale), 255);
  b = Math.min(Math.floor(b * scale), 255);

  return "#" + [r, g, b].map(hexString).join("");
};

const hexString = (number) => number.toString(16).padStart(2, "0");

// we want a pretty good change of brighter shades
//	so we add close to 0.5
const highScale = () => Math.random() + 0.7;
