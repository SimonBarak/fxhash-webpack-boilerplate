import { topWings, bottomWings } from "./maskA.js";

const getRandom = (max, min) => Math.floor(fxrand() * (max - min) + min);

const containerSVG1 = document.getElementById("svg1");
const containerMain1 = document.getElementById("main");
const containerMain2 = document.getElementById("main2");
const containerMain3 = document.getElementById("main3");
const containerMain4 = document.getElementById("main4");
const containerSecondary1 = document.getElementById("secondary");
const containerSecondary2 = document.getElementById("secondary2");
const containerSecondary3 = document.getElementById("secondary3");
const bodyMain = document.getElementById("bodyMain");
const topWingMask = document.getElementById("wingmask");
const bottomWingMask = document.getElementById("bottomWingMask");
const containerSVG3 = document.getElementById("svg3");

const scale = (value) => value;

const getUpOrDown = (basicPosition, lineLenght) => {
  if (basicPosition < lineLenght) {
    return +1;
  }
  if (basicPosition > lineLenght) {
    return -1;
  }
  return fxrand() < 0.5 ? -1 : 1;
};

const drowLine = (x1, y1, x2, y2, width, color) => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
  el.setAttribute("x1", scale(x1));
  el.setAttribute("y1", scale(y1));
  el.setAttribute("x2", scale(x2));
  el.setAttribute("y2", scale(y2));
  el.setAttribute("stroke-width", width);
  el.setAttribute("stroke", color);

  return el;
};

const drowMask = (type, paths) => {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "10");
  rect.setAttribute("y", "0");
  rect.setAttribute("width", "600");
  rect.setAttribute("height", "600");
  rect.setAttribute("fill", "black");

  const randomPath = getRandom(paths.length, 0);
  const d = paths[randomPath];
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill", "white");
  path.setAttribute("d", d);

  if (type === "top") {
    topWingMask.append(rect);
    topWingMask.append(path);
    path.setAttribute("style", "transform: translateY(3%)");
  }

  if (type === "bottom") {
    path.setAttribute("style", "transform: translateY(47%)");
    bottomWingMask.append(rect);
    bottomWingMask.append(path);
  }
};

drowMask("top", topWings);
drowMask("bottom", bottomWings);

const drowText = (x, y, text) => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "text");
  el.setAttribute("x", scale(x));
  el.setAttribute("y", scale(y));
  el.setAttribute("fill", `rgb(${fontColor})`);
  el.setAttribute("class", "svgText");
  el.innerHTML = text;

  return el;
};

const drowCircle = (cx, cy, r, fill) => {
  var newPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  newPath.setAttribute("cx", scale(cx));
  newPath.setAttribute("cy", scale(cy));
  newPath.setAttribute("r", r);
  newPath.setAttribute("fill", fill);
  return newPath;
};

const drowPath = (x1, y1, x2, y2, width) => {
  const newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  const d = `M ${scale(x1)} ${scale(y1)} Q ${Math.floor(
    fxrand() * (90 - 50) + 50
  )} 10 ${scale(x2)} ${scale(y2)}`;
  newLine.setAttribute("d", d);
  newLine.setAttribute("stroke-width", 40);
  newLine.setAttribute("stroke", "url(#grad1)");
  newLine.setAttribute("fill", "None");
  containerSVG1.append(newLine);
  //containerSVG2.append(newLine);
};
// UPPER WING DROW
let wingDrowStep = 0;
const radius2 = getRandom(25, 10) / 10;
const smallGrand = getRandom(15, 5);

const DrowTopWing = (loop) => {
  const gradient_A_url = createGradient(
    gradient,
    px - loop * 2,
    py - loop * 2,
    rx
  );

  for (let y = 10; y < 50; y++) {
    for (let i = 2; i < 40; i++) {
      if (fxrand() < 0.1) {
        containerMain1.append(
          drowCircle(i * 5, y * 4 + loop * 2, 2, gradient_A_url)
        );
        containerMain2.append(
          drowCircle(i * 5, y * 4 + loop * 2, 2, gradient_A_url)
        );
      }
    }
  }
};

const DrowBottomWing = (loop, type) => {
  const gradient_B_url = createGradient(gradient, px, 200 + py + loop * 2, rx);
  for (let y = 0; y < 40; y++) {
    for (let i = 9; i < 40; i++) {
      if (fxrand() < 0.1) {
        containerMain3.append(
          drowCircle(i * 5, 200 + y * 5 + loop, 2, gradient_B_url)
        );
        containerMain4.append(
          drowCircle(i * 5, 200 + y * 4 + loop, 2, gradient_B_url)
        );
      }
    }
  }
};

const DrowBody = (loop, type) => {
  const n = 0.8;
  const tx = 190 - Math.round(loop * n * loop * n);
  const tx2 = 210 - Math.round(loop * n * loop * n) * -1;

  for (let y = 0; y < 2; y++) {
    const ty = 150 - loop * 10 + y * 5;
    if (fxrand() < 0.8) {
      bodyMain.append(drowCircle(tx, ty, 2, "rgb(100, 100, 100)"));
    }
    if (fxrand() < 0.8) {
      bodyMain.append(drowCircle(tx2, ty, 2, "rgb(100, 100, 100)"));
    }
  }
  const step = loop * 2;
  wingDrowStep = wingDrowStep + 2;

  for (let y = 0; y < 20; y++) {
    for (let i = 0; i < 6; i++) {
      if (fxrand() < 0.1) {
        bodyMain.append(
          drowCircle(188 + i * 5, 150 + y * 4 + step, 2, "rgb(100, 100, 100)")
        );
      }
    }
  }

  for (let y = 0; y < 15; y++) {
    for (let i = 0; i < 3; i++) {
      if (fxrand() < 0.1) {
        bodyMain.append(
          drowCircle(195 + i * 5, 250 + y * 4 + step, 2, "rgb(100, 100, 100)")
        );
      }
    }
  }
};

const gradient0 = [
  [0, "230,230,150"],
  [0.1, "230,230,130"],
  [0.15, "250,250,50"],
  [0.2, "240,240,240"],
  [0.3, "240,240,240"],
  [0.4, "230,230,230"],
  [0.45, "250,250,50"],
  [0.5, "230,230,230"],
  [0.6, "220,220,150"],
  [1, "250,250,150"],
];

const gradient1 = [
  [0, "240,240,240"],
  [0.1, "230,230,230"],
  [0.2, "230,220,200"],
  [0.3, "250,250,150"],
  [0.4, "230,230,200"],
  [0.6, "220,220,150"],
  [1, "230,230,20"],
];

const gradient2 = [
  [0, "250,250,0"],
  [0.1, "230,230,130"],
  [0.15, "250,250,0"],
  [0.2, "240,240,240"],
  [0.3, "243,240,240"],
  [0.4, "250,250,150"],
  [0.45, "25,25,5"],
  [0.46, "250,250,250"],
  [0.5, "230,230,230"],
  [1, "250,250,250"],
];

let px = getRandom(200, 100);
let py = getRandom(300, 50);
let rx = getRandom(500, 200);

let fontColor = "";

const gradients = [gradient0, gradient1, gradient2];
const gradientNumb = getRandom(gradients.length, 0);
const gradient = gradients[gradientNumb];

// const smallGradients = [gradient4, gradient5, gradient6, gradient7];

const createGradient = (gradient, px, py, rx) => {
  // RETURN PREVIUS GRADIENT
  const id = "g" + getRandom(300, 0);
  const grad1 = document.createElementNS("http://www.w3.org/2000/svg", "defs");

  const gstrings = gradient.map((it) => {
    const st = `<stop offset='${it[0]}' style='stop-color:rgba(${it[1]});' stop-opacity='1'/>`;
    return st;
  });

  const gstring = gstrings.join("", gstrings);

  grad1.innerHTML = `
    <radialGradient id="${id}" cx=${px} cy=${py} r=${rx} gradientUnits="userSpaceOnUse" transform="scale(0, 1) " >
    ${gstring}
    </radialGradient>`;

  containerSVG1.append(grad1);
  return `url(#${id})`;
};
let loop = 0;

const autoDrawer = setInterval(function () {
  if (loop === 20) {
    clearInterval(autoDrawer);
  } else {
    loop++;
    DrowTopWing(loop);
    DrowBottomWing(loop);
    if (loop < 13) DrowBody(loop);
  }
}, 100);

document.body.classList.add("done");
