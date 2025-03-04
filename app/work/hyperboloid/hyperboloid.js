import * as util from "../util.js"

const numLines = 50;
const parentIDKey = 'artworkCanvas'

let parentID
let lineProperties
let currentPos

class LineProperty {
    constructor(h, s, b) {
        this.h = h
        this.s = s
        this.b = b
        this.alpha = 0
    }
    
    fade() {
        this.alpha -= 6
        if (this.alpha < 0) {
            this.alpha = 0
        }
    }

    appear() {
        this.alpha = 255
    }
}

const s = (p) => {
    p.setup = function () {
        parentID = p.select('[id*="' + parentIDKey + '"]').id()
        let canvasWidth = util.calcCanvasWidth(p, parentID)
        let canvas = p.createCanvas(canvasWidth, canvasWidth, p.WEBGL)
        canvas.parent(parentID)

        lineProperties = []
        for (let i = 0; i < numLines; i++) {
            lineProperties.push(new LineProperty(i, numLines, numLines))
        }
        currentPos = 0
    };

    p.windowResized = function () {
        let canvasWidth = util.calcCanvasWidth(p, parentID)
        if (canvasWidth == p.width) {
            return
        }
        p.resizeCanvas(canvasWidth, canvasWidth);
    }

    p.draw = function () {
        p.background(200);
        p.orbitControl(2, 2, 2);

        p.colorMode(p.HSB, numLines)

        if (p.frameCount % 2 == 0) {
            lineProperties[currentPos].appear()
            currentPos = (currentPos + 1) % numLines
        }

        for (let i = 0; i < numLines; i++) {
            p.rotateY(2.0 * p.PI / numLines)
            p.stroke(lineProperties[i].h, lineProperties[i].s, lineProperties[i].b, lineProperties[i].alpha)
            p.line(-p.width / 5, -2 * p.width / 5, p.width / 10, p.width / 5, 2 * p.width / 5, p.width / 10);
            if (p.frameCount % 2 == 0) {
                lineProperties[i].fade()
            }
        }
    };
};

export function spawn() {
    new p5(s);
}
