import chroma from "chroma-js";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateRandomDeg = () => {
  const deg = Math.floor(Math.random() * 100);

  if (deg > 365) {
    generateRandomDeg();
  }
  return deg;
};

export const getRandomGradient = () => {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const color3 = getRandomColor();
  return `linear-gradient(${generateRandomDeg()}deg, ${color1}, ${color2}, ${color3})`;
};

export const getTextColor = (bgColor: string) => {
  const colorArray = bgColor.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/g);

  if (colorArray && colorArray.length > 0) {
    const firstColor = colorArray[0];

    const baseColor = chroma(firstColor);

    const contrastingColor = baseColor.set("hsl.h", "+180").hex();

    const isLight = baseColor.luminance() > 0.5;

    return isLight ? contrastingColor : "#ffffff";
  }
  return "#ffffff";
};
