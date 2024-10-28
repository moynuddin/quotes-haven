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

// const getRandomShape = () => {
//   const shapes = ["circle", "ellipse"];

//   const shape = shapes[Math.floor(Math.random() * shapes.length)];
//   return shape;
// };

// const getRandomSize = () => {
//   const sizes = [
//     "closest-side",
//     "farthest-side",
//     "closest-corner",
//     "farthest-corner",
//   ];

//   const size = sizes[Math.floor(Math.random() * sizes.length)];

//   return size;
// };

export const getRandomGradient = () => {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const color3 = getRandomColor();
  return `linear-gradient(${generateRandomDeg()}deg, ${color1}, ${color2}, ${color3})`;
  // return `radial-gradient(${getRandomShape()} ${getRandomSize()}, ${color1}, ${color2}, ${color3})`;
  // return `conic-gradient(${color1}, ${color2}, ${color3})`;
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
