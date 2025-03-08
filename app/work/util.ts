import p5 from "p5";

const minCanvasWidth = 300
const maxCanvasWidth = 500

export function calcCanvasWidth(p: p5, parentID: string) {
    const canvasParent = p.select('#' + parentID);
    if (canvasParent === null) {
        return 0
    }
    let canvasWidth = canvasParent.width
    if (canvasWidth < minCanvasWidth) {
        canvasWidth = minCanvasWidth
    } else if (canvasWidth > maxCanvasWidth) {
        canvasWidth = maxCanvasWidth
    }
    return canvasWidth
}
