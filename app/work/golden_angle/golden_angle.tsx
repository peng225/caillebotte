import * as util from "../util"
import p5 from "p5";

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const s = (p: p5) => {
    const goldenAngle = 2.4
    const maxLeafCount = 162
    const buttonX = 10, buttonY = 10
    const parentIDKey = 'artworkCanvas'

    let parentID: string
    let leaves: { x: number, y: number, angle: number }[] = []
    let resetButton: p5.Element

    p.setup = function () {
        const tmpParentID = p.select('[id*="' + parentIDKey + '"]')?.id()
        if (tmpParentID == null) {
            console.log("Failed to get the parentID.")
            p.noLoop()
            return
        }
        parentID = tmpParentID
        const canvasWidth = util.calcCanvasWidth(p, parentID)
        const canvas = p.createCanvas(canvasWidth, canvasWidth, p.P2D)
        canvas.parent(parentID)

        p.frameRate(5)

        resetButton = p.createButton('reset');
        resetButton.parent(parentID)
        resetButton.position(buttonX, buttonY);
        resetButton.mousePressed(function () {
            leaves = []
        });
    }

    p.windowResized = function () {
        const canvasWidth = util.calcCanvasWidth(p, parentID)
        if (canvasWidth == p.width) {
            return
        }
        p.resizeCanvas(canvasWidth, canvasWidth);
    }

    p.draw = function () {
        p.background(240);
        if (leaves.length < maxLeafCount) {
            leaves.push({ x: 0, y: 0, angle: goldenAngle * p.frameCount })
        }
        p.translate(p.width / 2, p.height / 2);

        for (const leaf of leaves) {
            drawLeaf(leaf.x, leaf.y, p.width * 0.2, p.height * 0.4, leaf.angle);
        }
    }

    function drawLeaf(x: number, y: number, w: number, h: number, angle: number) {
        p.fill(30, 160, 80, 10);
        p.stroke(20, 120, 60);
        p.strokeWeight(1);

        p.push()
        p.rotate(-angle)
        p.beginShape();
        p.vertex(x, y);
        p.bezierVertex(
            x + w / 2, y + h / 4,
            x + w / 2, y + 3 * h / 4,
            x, y + h
        );
        p.bezierVertex(
            x - w / 2, y + 3 * h / 4,
            x - w / 2, y + h / 4,
            x, y
        );
        p.endShape(p.CLOSE);
        p.pop()
    }
}

let p5Instance: p5 | undefined = undefined;
export default function Kick() {
    const pathname = usePathname()
    useEffect(() => {
        if (p5Instance === undefined) {
            p5Instance = new p5(s)
        }
        return () => {
            p5Instance?.remove();
            p5Instance = undefined;
        };
    }, [pathname])
    return (
        <></>
    )
}
