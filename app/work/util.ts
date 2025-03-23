import p5 from "p5";

const minCanvasWidth = 300;
const maxCanvasWidth = 500;

export function calcCanvasWidth(p: p5, parentID: string) {
  const canvasParent = p.select("#" + parentID);
  if (canvasParent === null) {
    return 0;
  }
  let canvasWidth = canvasParent.width;
  if (canvasWidth < minCanvasWidth) {
    canvasWidth = minCanvasWidth;
  } else if (canvasWidth > maxCanvasWidth) {
    canvasWidth = maxCanvasWidth;
  }
  return canvasWidth;
}

export function cursorOnCanvas(p: p5): boolean {
  return 0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height;
}

export function anyTouchesOnCanvas(p: p5): boolean {
  for (const v of p.touches) {
    const t = v as { x: number; y: number };
    if (0 < t.x && t.x < p.width && 0 < t.y && t.y < p.height) {
      return true;
    }
  }
  return false;
}
