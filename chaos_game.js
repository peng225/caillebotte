// This program was developed with reference to the following blog post.
// https://gin-graphic.hatenablog.com/entry/2023/12/20/060000

const bgGrayScaleValue = 230
const controlHeight = 60
const maxAnimationCount = 200
const gapBetweenComponents = 10

let canvas
let buffer
let vertexes
let currentPoint
let divRatioSlider
let resetButton
let suspendAndResumeButton
let numPolygonVertexesSelector
let animationCount
let animationRunning
let currentDivRatio
let currentNumVertexes

function setup() {
    const canvasSize = 480
    canvas = createCanvas(canvasSize, canvasSize)
    background(bgGrayScaleValue)

    buffer = createGraphics(width, height)

    animationCount = 0
    animationRunning = true

    let nextComponentX = 15

    resetButton = createButton('reset');
    resetButton.position(nextComponentX, 15);
    resetButton.mousePressed(function () {
        animationCount = 0
        background(bgGrayScaleValue)
        animationRunning = true
        currentDivRatio = divRatioSlider.value()
        currentNumVertexes = parseInt(numPolygonVertexesSelector.value())
        vertexes = spawnPolygonVertexes(currentNumVertexes)
    });

    nextComponentX += resetButton.width + gapBetweenComponents

    suspendAndResumeButton = createButton('suspend/resume');
    suspendAndResumeButton.position(nextComponentX, 15);
    suspendAndResumeButton.mousePressed(function () {
        if (animationCount < maxAnimationCount) {
            animationRunning = !animationRunning
        }
    });

    nextComponentX += suspendAndResumeButton.width + gapBetweenComponents

    numPolygonVertexesSelector = createSelect();
    numPolygonVertexesSelector.position(nextComponentX, 15);
    numPolygonVertexesSelector.option(3);
    numPolygonVertexesSelector.option(4);
    numPolygonVertexesSelector.option(5);
    numPolygonVertexesSelector.option(6);
    numPolygonVertexesSelector.option(7);

    nextComponentX += numPolygonVertexesSelector.width + gapBetweenComponents

    textSize(18);

    const defaultDivRatio = 50
    divRatioSlider = createSlider(1, 99, defaultDivRatio, 1);
    divRatioSlider.position(nextComponentX, 15);
    divRatioSlider.style('width', '100px');
    currentDivRatio = defaultDivRatio

    currentNumVertexes = 3
    vertexes = spawnPolygonVertexes(currentNumVertexes)

    currentPoint = {
        x: random(-1, 1) * width / 2,
        y: random(-1, 1) * height / 2
    }
}

function spawnPolygonVertexes(n) {
    let vtxs = []
    for (let i = 0; i < n; i++) {
        let x = width * 0.4 * cos(TAU / n * i)
        let y = height * 0.4 * sin(TAU / n * i)
        vtxs[i] = { x: x, y: y }
    }
    return vtxs
}

function drawControls() {
    text(divRatioSlider.value(), 330, 20);
    text("progress: " + round(animationCount * 100.0 / maxAnimationCount) + "%", 10, 50);
}

function drawPoint() {
    let vertex = random(vertexes)

    let x = currentPoint.x + (vertex.x - currentPoint.x) * (currentDivRatio / 100.0)
    let y = currentPoint.y + (vertex.y - currentPoint.y) * (currentDivRatio / 100.0)

    point(x, y)

    currentPoint = { x: x, y: y }
}

function draw() {
    // Push the current canvas to the buffer.
    buffer.copy(canvas,
        0, controlHeight, width, height - controlHeight,
        0, controlHeight, buffer.width, buffer.height - controlHeight
    )
    background(bgGrayScaleValue)
    // Pop the buffer contents to the canvas.
    copy(buffer,
        0, controlHeight, buffer.width, buffer.height - controlHeight,
        0, controlHeight, width, height - controlHeight
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

    translate(width / 2, (height - controlHeight) / 2 + controlHeight)
    for (i = 0; i < 100; i++) {
        drawPoint()
    }
    animationCount++
}