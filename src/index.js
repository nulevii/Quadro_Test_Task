import "./styles.css";

let detail = {
  length: 350,
  width: 250,
  lt: { radius: 0 },
  lb: { radius: 0 },
  rt: { radius: 0 },
  rb: { radius: 0 },
};

{
  const app = document.getElementById("app");
  const heightInput = document.getElementById("heightInput");
  const widthInput = document.getElementById("widthInput");
  const rightAngleInput = document.getElementById("rightAngleInput");
  const rotateZ = document.getElementById("rotateZ");

  //your code here....
  const fixedHeight = 820;
  const maxElementSize = 800;

  let rotateSwitch = true;
  let windowWidth = window.innerWidth;
  let elementWidth = detail.length;
  let elementHeight = detail.width;
  let xPosition = windowWidth / 2 - elementWidth / 2;
  let yPosition = elementHeight / 2 - elementHeight / 2;

  const svgns = "http://www.w3.org/2000/svg";
  const svg = document.getElementsByTagName("svg")[0];

  const rotate = () => {
    rotateSwitch = !rotateSwitch;
    [detail.lt, detail.rt, detail.rb, detail.lb] = [
      detail.lb,
      detail.lt,
      detail.rt,
      detail.rb,
    ];
  };

  const positionCheck = () => {
    if (rotateSwitch === true) {
      elementWidth = detail.length;
      elementHeight = detail.width;
    }
    if (rotateSwitch === false) {
      elementWidth = detail.width;
      elementHeight = detail.length;
    }
  };

  const updateSvgDimentions = () => {
    windowWidth = window.innerWidth;
    svg.style.width = `${windowWidth}px`;
    // svg.style.height = `${elementHeight + 20}px`;
    svg.style.height = `${fixedHeight}px`;
    xPosition = windowWidth / 2 - elementWidth / 2;
    yPosition = fixedHeight / 2 - elementHeight / 2;
  };
  updateSvgDimentions();

  const updateData = () => {
    if (
      Number.isNaN(detail.length) ||
      Number.isNaN(detail.width) ||
      Number.isNaN(detail.rt.radius) ||
      Number.isNaN(detail.lt.radius) ||
      Number.isNaN(detail.rb.radius) ||
      Number.isNaN(detail.lb.radius)
    ) {
      return (svg.innerHTML = `<text class="svg-text" x="$10" y="375"   font-size="50" fill="white">Input data is uncorrect.</text>
      <text class="svg-text" x="$10" y="425"  font-size="35" fill="white">Input data shoud contain only.</text>`);
    }
    if (detail.length > maxElementSize || detail.width > maxElementSize) {
      return (svg.innerHTML = `<text class="svg-text" x="$10" y="375"   font-size="50" fill="white">Input data is uncorrect.</text>
      <text class="svg-text" x="$10" y="425"  font-size="35" fill="white">Max height = ${maxElementSize}, Max width = ${maxElementSize}.</text>`);
    }
    if (
      detail.rt.radius > elementWidth / 2 ||
      detail.lt.radius > elementWidth / 2 ||
      detail.rb.radius > elementWidth / 2 ||
      detail.lb.radius > elementWidth / 2 ||
      detail.rt.radius > elementHeight / 2 ||
      detail.lt.radius > elementHeight / 2 ||
      detail.rb.radius > elementHeight / 2 ||
      detail.lb.radius > elementHeight / 2
    ) {
      return (svg.innerHTML = `<text class="svg-text" x="$10"  y="375"   font-size="50">Input data is uncorrect.</text>
      <text class="svg-text" x="$10" y="425"  font-size="20">Element radius can not be biger than half of the rectangle side.</text>`);
    }

    const rect = document.createElementNS(svgns, "path");
    const pathDataValue = generatePathData(
      xPosition,
      yPosition,
      elementWidth,
      elementHeight,
      detail.rt.radius,
      detail.rb.radius,
      detail.lb.radius,
      detail.lt.radius
    );
    rect.setAttributeNS(null, "d", pathDataValue);

    svg.innerHTML = "";
    svg.appendChild(rect);
  };

  const arcParameter = (
    rx,
    ry,
    xAxisRotation,
    largeArcFlag,
    sweepFlag,
    x,
    y
  ) => {
    return [
      rx,
      ",",
      ry,
      " ",
      xAxisRotation,
      " ",
      largeArcFlag,
      ",",
      sweepFlag,
      " ",
      x,
      ",",
      y,
    ].join("");
  };

  const generatePathData = (x, y, width, height, rt, rb, lb, lt) => {
    let data = [];
    data.push("M" + (x + width / 2) + "," + y);
    data.push("H" + (x + width - rt));
    if (rt > 0) {
      data.push("A" + arcParameter(rt, rt, 0, 0, 1, x + width, y + rt));
    }
    data.push("V" + (y + height - rb));
    if (rb > 0) {
      data.push(
        "A" + arcParameter(rb, rb, 0, 0, 1, x + width - rb, y + height)
      );
    }
    data.push("H" + (x + lb));
    if (lb > 0) {
      data.push("A" + arcParameter(lb, lb, 0, 0, 1, x + 0, y + height - lb));
    }
    data.push("V" + (y + lt));
    if (lt > 0) {
      data.push("A" + arcParameter(lt, lt, 0, 0, 1, x + lt, y + 0));
    }
    data.push("Z");
    return data.join(" ");
  };
  updateData();

  window.addEventListener("resize", () => {
    positionCheck();
    updateSvgDimentions();
    updateData();
  });

  rotateZ.addEventListener("click", () => {
    rotate();
    positionCheck();
    updateSvgDimentions();
    updateData();
  });

  heightInput.addEventListener("input", (e) => {
    detail.length = Number(e.target.value);
    positionCheck();
    updateSvgDimentions();
    updateData();
  });

  widthInput.addEventListener("input", (e) => {
    detail.width = Number(e.target.value);
    positionCheck();
    updateSvgDimentions();
    updateData();
  });

  rightAngleInput.addEventListener("input", (e) => {
    detail.rt.radius = Number(e.target.value);
    positionCheck();
    updateSvgDimentions();
    updateData();
  });
}
