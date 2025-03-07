import * as util from "../util.js"
import p5 from "p5";

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface SelectElement extends p5.Element {
    option: (value: string) => void;
}

const s = (p: p5) => {
    const bgGrayScaleValue = 230
    const controlHeight = 60
    const maxAnimationCount = 200
    const gapBetweenComponents = 10
    const parentIDKey = 'artworkCanvas'

    let parentID: string
    let canvas: p5.Element
    let buffer: p5.Graphics
    let vertices: { x: number, y: number }[]
    let currentPoint: { x: number, y: number }
    let divRatioSlider: p5.Element
    let resetButton: p5.Element
    let suspendAndResumeButton: p5.Element
    let numPolygonVerticesSelector: SelectElement
    let animationCount: number
    let animationRunning: boolean
    let currentDivRatio: number
    let currentNumVertices: number
    
    function resetAnimation() {
        animationCount = 0
        p.background(bgGrayScaleValue)
        animationRunning = true
        currentDivRatio = parseInt(divRatioSlider.value().toString())
        currentNumVertices = parseInt(numPolygonVerticesSelector.value().toString())
        vertices = spawnPolygonVertices(currentNumVertices)
        suspendAndResumeButton.html('suspend')
    }

    p.setup = function () {
        const tmpParentID = p.select('[id*="' + parentIDKey + '"]')?.id()
        if (tmpParentID == null) {
            console.log("Failed to get the parentID.")
            p.noLoop()
            return
        }
        parentID = tmpParentID
        const canvasWidth = util.calcCanvasWidth(p, parentID)
        canvas = p.createCanvas(canvasWidth, canvasWidth)
        canvas.parent(parentID);
        p.background(bgGrayScaleValue)

        buffer = p.createGraphics(p.width, p.height)

        animationCount = 0
        animationRunning = true

        let nextComponentX = 10

        resetButton = p.createButton('reset');
        resetButton.parent(parentID)
        resetButton.position(nextComponentX, 10);
        resetButton.mousePressed(resetAnimation);

        nextComponentX += resetButton.width + gapBetweenComponents

        suspendAndResumeButton = p.createButton('suspend');
        suspendAndResumeButton.parent(parentID)
        suspendAndResumeButton.position(nextComponentX, 10);
        suspendAndResumeButton.mousePressed(function () {
            if (animationCount < maxAnimationCount) {
                animationRunning = !animationRunning
                if (animationRunning) {
                    suspendAndResumeButton.html('suspend')
                } else {
                    suspendAndResumeButton.html('resume')
                }
            }
        });

        nextComponentX += suspendAndResumeButton.width + gapBetweenComponents

        numPolygonVerticesSelector = p.createSelect() as SelectElement;
        numPolygonVerticesSelector.parent(parentID)
        numPolygonVerticesSelector.position(nextComponentX, 10);
        numPolygonVerticesSelector.option("3");
        numPolygonVerticesSelector.option("4");
        numPolygonVerticesSelector.option("5");
        numPolygonVerticesSelector.option("6");
        numPolygonVerticesSelector.option("7");

        nextComponentX += numPolygonVerticesSelector.width + gapBetweenComponents

        p.textSize(18);

        const defaultDivRatio = 50
        divRatioSlider = p.createSlider(1, 99, defaultDivRatio, 1);
        divRatioSlider.parent(parentID)
        divRatioSlider.position(nextComponentX, 10);
        divRatioSlider.style('width', '100px');
        currentDivRatio = defaultDivRatio

        currentNumVertices = 3
        vertices = spawnPolygonVertices(currentNumVertices)

        currentPoint = {
            x: p.random(-1, 1) * p.width / 2,
            y: p.random(-1, 1) * p.height / 2
        }
    }

    p.windowResized = function () {
        const canvasWidth = util.calcCanvasWidth(p, parentID)
        if (canvasWidth == p.width) {
            return
        }
        p.resizeCanvas(canvasWidth, canvasWidth);
        buffer = p.createGraphics(p.width, p.height)
        resetAnimation()
    }

    function spawnPolygonVertices(n: number): { x: number, y: number }[] {
        const vtxs: { x: number, y: number }[] = []
        for (let i = 0; i < n; i++) {
            const x = p.width * 0.4 * p.cos(p.TAU / n * i)
            const y = p.height * 0.4 * p.sin(p.TAU / n * i)
            vtxs[i] = { x: x, y: y }
        }
        return vtxs
    }

    function drawControls() {
        p.text(divRatioSlider.value(), 260, 25);
        p.text("progress: " + p.round(animationCount * 100.0 / maxAnimationCount) + "%", 10, 50);
    }

    function drawPoint() {
        const vertex = p.random(vertices)

        const x = currentPoint.x + (vertex.x - currentPoint.x) * (currentDivRatio / 100.0)
        const y = currentPoint.y + (vertex.y - currentPoint.y) * (currentDivRatio / 100.0)

        p.point(x, y)

        currentPoint = { x: x, y: y }
    }

    p.draw = function () {
        // Push the current canvas to the buffer.
        buffer.copy(canvas,
            0, controlHeight, p.width, p.height - controlHeight,
            0, controlHeight, buffer.width, buffer.height - controlHeight
        )
        p.background(bgGrayScaleValue)
        // Pop the buffer contents to the canvas.
        p.copy(buffer,
            0, controlHeight, buffer.width, buffer.height - controlHeight,
            0, controlHeight, p.width, p.height - controlHeight
        )

        drawControls()

        if (!animationRunning) {
            return
        }

        if (animationCount >= maxAnimationCount) {
            console.log("Animation finished")
            animationRunning = false
            return
        }

        p.translate(p.width / 2, (p.height - controlHeight) / 2 + controlHeight)
        for (let i = 0; i < 100; i++) {
            drawPoint()
        }
        animationCount++
    }
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
