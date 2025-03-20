import * as util from "../util"
import p5 from "p5";
import { Delaunay, Voronoi } from "d3-delaunay";

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const s = (p: p5) => {
    const parentIDKey = 'artworkCanvas'
    const buttonX = 10, buttonY = 10
    const colors = [
        '#FFB3B3', // red
        '#FFCC99', // orange
        '#FFFF99', // yellow
        '#B3FFB3', // green
        '#99CCFF', // blue
        '#B3A0FF', // indigo
        '#D1A1FF', // violet
    ]

    let parentID: string
    let points: [number, number][] = [];
    let cellColors: string[]
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
        p.noLoop();

        resetButton = p.createButton('reset');
        resetButton.parent(parentID)
        resetButton.position(buttonX, buttonY);
        resetButton.mousePressed(function () {
            points = []
        });
    }

    p.draw = function () {
        p.background(240);

        const delaunay = Delaunay.from(points);
        const voronoi = delaunay.voronoi([0, 0, p.width, p.height]);

        p.stroke(0);
        const cellCount = Array.from(voronoi.cellPolygons()).length
        cellColors = new Array(cellCount).fill("");
        for (const cell of voronoi.cellPolygons()) {
            const cellColor = selectColor(voronoi, cell.index, cellColors)
            if (cellColor === "") {
                console.log("Failed to select a color.")
                return
            }
            cellColors[cell.index] = cellColor
            p.fill(cellColor)
            p.beginShape();
            for (const [x, y] of cell) {
                p.vertex(x, y);
            }
            p.endShape(p.CLOSE);
        }

        p.fill(0, 0, 0);
        p.noStroke();
        for (const [x, y] of points) {
            p.circle(x, y, 5);
        }
    }

    p.mousePressed = function () {
        if (outOfButtonRegion() && util.cursorOnCanvas(p)) {
            points.push([p.mouseX, p.mouseY]);
        }
        p.redraw();
    }

    function outOfButtonRegion(): boolean {
        return p.mouseX < buttonX || p.mouseX > buttonX + resetButton.width ||
            p.mouseY < buttonY || p.mouseY > buttonY + resetButton.height
    }

    function selectColor(voronoi: Voronoi<Delaunay.Point>,
        targetCellIndex: number, cellColors: string[]): string {
        const candidate = new Set<string>(colors)
        for (const neighborCellIndex of voronoi.neighbors(targetCellIndex)) {
            if (candidate.has(cellColors[neighborCellIndex])) {
                candidate.delete(cellColors[neighborCellIndex])
            }
        }
        if (candidate.size === 0) {
            console.log("No candidate found for the cell color.")
            return ""
        }
        const usedCounts = new Map<string, number>();
        for (const c of candidate) {
            usedCounts.set(c, 0)
        }
        for (const cell of voronoi.cellPolygons()) {
            if (cellColors[cell.index] === "") {
                continue
            }
            const currentVal = usedCounts.get(cellColors[cell.index])
            if (currentVal !== undefined) {
                usedCounts.set(cellColors[cell.index], currentVal + 1)
            }
        }
        let resultColor = ""
        let minCount = Number.MAX_SAFE_INTEGER
        for (const [key, value] of usedCounts) {
            if (value < minCount) {
                resultColor = key
                minCount = value
            }
        }
        return resultColor
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
