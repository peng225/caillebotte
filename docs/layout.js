const minCanvasWidth = 300
const maxCanvasWidth = 500

export function calcCanvasWidth(p, parentID) {
    let canvasParent = p.select('#' + parentID);
    let canvasWidth = canvasParent.width
    if (canvasWidth < minCanvasWidth) {
        canvasWidth = minCanvasWidth
    } else if (canvasWidth > maxCanvasWidth) {
        canvasWidth = maxCanvasWidth
    }
    return canvasWidth
}
