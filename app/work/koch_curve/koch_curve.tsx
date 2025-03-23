import * as util from "../util";
import p5 from "p5";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const s = (p: p5) => {
  const parentIDKey = "artworkCanvas";

  let parentID: string;
  let scale: number = 1.0;
  let previousDistance: number | null = null;

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

    p.noLoop();
  };

  p.windowResized = function () {
    const canvasWidth = util.calcCanvasWidth(p, parentID);
    if (canvasWidth == p.width) {
      return;
    }
    p.resizeCanvas(canvasWidth, canvasWidth);
  };

  function adjustScale(): number {
    let ret = scale;
    if (scale < 1) {
      ret = 1;
    } else if (scale >= 9) {
      ret -= 6;
    }
    return ret;
  }

  p.mouseWheel = function (event: WheelEvent) {
    if (!util.cursorOnCanvas(p)) {
      return;
    }

    const maxDelta = 0.5;

    let delta = event.deltaY / 10;
    delta = Math.min(maxDelta, delta);
    delta = Math.max(-maxDelta, delta);
    scale += delta;
    scale = adjustScale();
    p.redraw();
    return false;
  };

  p.touchMoved = function () {
    if (p.touches.length !== 2) {
      previousDistance = null;
      return;
    }

    if (!util.anyTouchesOnCanvas(p)) {
      previousDistance = null;
      return;
    }

    const t0 = p.touches[0] as { x: number; y: number };
    const t1 = p.touches[1] as { x: number; y: number };
    const d = p.dist(t0.x, t0.y, t1.x, t1.y);

    if (previousDistance !== null) {
      const scaleChange = d / previousDistance;
      scale *= scaleChange;
      scale = adjustScale();
    }

    previousDistance = d;
    p.redraw();
    return false;
  };

  p.touchEnded = function () {
    previousDistance = null;
  };

  p.draw = function () {
    p.background(240);
    p.stroke(25, 25, 112);
    p.strokeWeight(1 / scale);
    p.translate(p.width / 2, p.height / 2);

    p.translate(-p.width * 0.4, +p.height * 0.1);
    p.scale(scale);
    p.translate(p.width * 0.4, -p.height * 0.1);

    const start = p.createVector(-0.4 * p.width, 0.1 * p.height);
    const end = p.createVector(0.4 * p.width, 0.1 * p.height);
    // Prevent drawing out-of-canvas area for performance.
    if (scale >= 4) {
      end.x = (-0.8 / 6) * p.width;
      end.y = 0.1 * p.height;
    }
    drawKochCurve(start, end, calcDepth());
  };

  function calcDepth(): number {
    if (scale < 2) {
      return 5;
    }
    return 6;
  }

  function drawKochCurve(start: p5.Vector, end: p5.Vector, depth: number) {
    if (depth === 0) {
      p.line(start.x, start.y, end.x, end.y);
      return;
    }
    const leftPoint = p.createVector((2 * start.x + end.x) / 3.0, (2 * start.y + end.y) / 3.0);
    const midPoint = p.createVector(
      ((end.x + start.x) * 3 + (end.y - start.y) * Math.sqrt(3)) / 6,
      (-(end.x - start.x) * Math.sqrt(3) + (end.y + start.y) * 3) / 6
    );
    const rightPoint = p.createVector((start.x + 2 * end.x) / 3.0, (start.y + 2 * end.y) / 3.0);
    drawKochCurve(start, leftPoint, depth - 1);
    drawKochCurve(leftPoint, midPoint, depth - 1);
    drawKochCurve(midPoint, rightPoint, depth - 1);
    drawKochCurve(rightPoint, end, depth - 1);
  }
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
