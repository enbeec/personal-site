export const randomShadeOf = (hexColor) => {
  var r = parseInt(hexColor.slice(1, 3), 16);
  var g = parseInt(hexColor.slice(3, 5), 16);
  var b = parseInt(hexColor.slice(5, 7), 16);

  const multiplier = newMultiplier();
  r = Math.min(Math.floor(r * multiplier), 255);
  g = Math.min(Math.floor(g * multiplier), 255);
  b = Math.min(Math.floor(b * multiplier), 255);

  return "#" + [r, g, b].map(hexString).join("");
};

const hexString = (number) => number.toString(16).padStart(2, "0");

const newMultiplier = () => Math.random() + 0.4;
