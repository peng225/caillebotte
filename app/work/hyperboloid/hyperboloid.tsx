import * as util from "../util"
import p5 from "p5";

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

class LineProperty {
    h: number
    s: number
    b: number
    alpha: number
    constructor(h: number, s: number, b: number) {
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

const s = (p: p5) => {
    const numLines = 50;
    const parentIDKey = 'artworkCanvas'

    let parentID: string
    let lineProperties: LineProperty[]
    let currentPos: number

    p.setup = function () {
        const tmpParentID = p.select('[id*="' + parentIDKey + '"]')?.id()
        if (tmpParentID == null) {
            console.log("Failed to get the parentID.")
            p.noLoop()
            return
        }
        parentID = tmpParentID
        const canvasWidth = util.calcCanvasWidth(p, parentID)
        const canvas = p.createCanvas(canvasWidth, canvasWidth, p.WEBGL)
        canvas.parent(parentID)

        lineProperties = []
        for (let i = 0; i < numLines; i++) {
            lineProperties.push(new LineProperty(i, numLines, numLines))
        }
        currentPos = 0
    };

    p.windowResized = function () {
        const canvasWidth = util.calcCanvasWidth(p, parentID)
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

let p5Instance: p5 | undefined = undefined;
export default function Kick() {
    const pathname = usePathname()
    useEffect(() => {
        if (p5Instance === undefined) {
            p5Instance = new p5(s)
        }
        return () => {
            if (p5Instance !== undefined) {
                p5Instance.remove();
                p5Instance = undefined;
            }
        };
    }, [pathname])
    return (
        <></>
    )
}
