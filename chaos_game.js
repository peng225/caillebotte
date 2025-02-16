// This program was developed with reference to the following blog post.
// https://gin-graphic.hatenablog.com/entry/2023/12/20/060000

let vertexes
let currentPoint

function setup() {
    const canvasSize = 480
    createCanvas(canvasSize, canvasSize)
    background(230)
    frameRate(60)

    vertexes = []
    for (let i = 0; i < 3; i++) {
        let x = width * 0.4 * cos(TAU / 3 * i)
        let y = height * 0.4 * sin(TAU / 3 * i)
        vertexes[i] = { x: x, y: y }
    }

    currentPoint = {
        x: random(-1, 1) * width / 2,
        y: random(-1, 1) * height / 2
    }
}

function drawPoint() {
    let vertex = random(vertexes)

    let x = currentPoint.x + (vertex.x - currentPoint.x) * 0.5
    let y = currentPoint.y + (vertex.y - currentPoint.y) * 0.5

    point(x, y)

    currentPoint = { x: x, y: y }
}

function draw() {
    translate(width / 2, height / 2)
    if (frameCount >= 200) {
        console.log("finish")
        noLoop()
        return
    }
    for (i = 0; i < 100; i++) {
        drawPoint()
    }
}