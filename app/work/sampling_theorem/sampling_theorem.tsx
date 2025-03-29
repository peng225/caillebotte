import * as util from "../util";
import p5 from "p5";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import airPlane from "../../../public/images/airplane.png";

const s = (p: p5) => {
  const fpsMeasureIntervalInSec = 2;
  const parentIDKey = "artworkCanvas";

  let parentID: string;
  let airPlaneImg: p5.Image;
  let rotatePerSecSlider: p5.Element;
  let r: number;
  let theta = 0;
  let actualFrameCount = 0;
  let fps: number;

  p.preload = function () {
    airPlaneImg = p.loadImage(airPlane.src);
  };

  p.setup = function () {
    const tmpParentID = p.select('[id*="' + parentIDKey + '"]')?.id();
    if (tmpParentID == null) {
      console.log("Failed to get the parentID.");
      p.noLoop();
      return;
    }
    parentID = tmpParentID;
    const canvasWidth = util.calcCanvasWidth(p, parentID);
    const canvas = p.createCanvas(canvasWidth, canvasWidth, p.P2D);
    canvas.parent(parentID);

    r = p.width * 0.35;

    const fr = 30;
    p.frameRate(fr);
    fps = fr;

    rotatePerSecSlider = p.createSlider(0, fr, 0, 1);
    rotatePerSecSlider.parent(parentID);
    rotatePerSecSlider.position(10, 10);
    rotatePerSecSlider.style("width", "120px");

    setInterval(function () {
      fps = actualFrameCount / fpsMeasureIntervalInSec;
      actualFrameCount = 0;
    }, fpsMeasureIntervalInSec * 1000);
  };

  p.windowResized = function () {
    const canvasWidth = util.calcCanvasWidth(p, parentID);
    if (canvasWidth == p.width) {
      return;
    }
    p.resizeCanvas(canvasWidth, canvasWidth);
    r = p.width * 0.35;
  };

  p.draw = function () {
    actualFrameCount++;
    p.background(240);

    p.textSize(18);
    p.text(rotatePerSecSlider.value(), rotatePerSecSlider.width + 30, 30);
    p.text(fps + "fps", p.width - 80, 30);

    p.translate(p.width / 2, p.height * 0.52);
    const rotatePerSec = Number(rotatePerSecSlider.value());
    theta += (p.TAU * rotatePerSec) / p.frameRate();
    const airPlaneCenterX = r * Math.cos(theta);
    const airPlaneCenterY = r * Math.sin(theta);
    p.translate(airPlaneCenterX, airPlaneCenterY);
    p.rotate(theta + p.PI / 2);
    p.image(airPlaneImg, -p.width * 0.05, -p.width * 0.05, p.width * 0.12, p.width * 0.12);
  };
};

let p5Instance: p5 | undefined = undefined;
export default function Kick() {
  const pathname = usePathname();
  useEffect(() => {
    if (p5Instance === undefined) {
      p5Instance = new p5(s);
    }
    return () => {
      p5Instance?.remove();
      p5Instance = undefined;
    };
  }, [pathname]);
  return <></>;
}
