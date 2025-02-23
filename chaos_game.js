const bgGrayScaleValue = 230
const controlHeight = 60
const maxAnimationCount = 200
const gapBetweenComponents = 10
const parentID = 'artwork-canvas'

let canvas
let buffer
let vertices
let currentPoint
let divRatioSlider
let resetButton
let suspendAndResumeButton
let numPolygonVerticesSelector
let animationCount
let animationRunning
let currentDivRatio
let currentNumVertices

function setup() {
    const canvasSize = 480
    canvas = createCanvas(canvasSize, canvasSize)
    canvas.parent(parentID);
    background(bgGrayScaleValue)

    buffer = createGraphics(width, height)

    animationCount = 0
    animationRunning = true

    let nextComponentX = 10

    resetButton = createButton('reset');
    resetButton.parent(parentID)
    resetButton.position(nextComponentX, 10);
    resetButton.mousePressed(function () {
        animationCount = 0
        background(bgGrayScaleValue)
        animationRunning = true
        currentDivRatio = divRatioSlider.value()
        currentNumVertices = parseInt(numPolygonVerticesSelector.value())
        vertices = spawnPolygonVertices(currentNumVertices)
    });

    nextComponentX += resetButton.width + gapBetweenComponents

    suspendAndResumeButton = createButton('suspend/resume');
    suspendAndResumeButton.parent(parentID)
    suspendAndResumeButton.position(nextComponentX, 10);
    suspendAndResumeButton.mousePressed(function () {
        if (animationCount < maxAnimationCount) {
            animationRunning = !animationRunning
        }
    });

    nextComponentX += suspendAndResumeButton.width + gapBetweenComponents

    numPolygonVerticesSelector = createSelect();
    numPolygonVerticesSelector.parent(parentID)
    numPolygonVerticesSelector.position(nextComponentX, 10);
    numPolygonVerticesSelector.option(3);
    numPolygonVerticesSelector.option(4);
    numPolygonVerticesSelector.option(5);
    numPolygonVerticesSelector.option(6);
    numPolygonVerticesSelector.option(7);

    nextComponentX += numPolygonVerticesSelector.width + gapBetweenComponents

    textSize(18);

    const defaultDivRatio = 50
    divRatioSlider = createSlider(1, 99, defaultDivRatio, 1);
    divRatioSlider.parent(parentID)
    divRatioSlider.position(nextComponentX, 10);
    divRatioSlider.style('width', '100px');
    currentDivRatio = defaultDivRatio

    currentNumVertices = 3
    vertices = spawnPolygonVertices(currentNumVertices)

    currentPoint = {
        x: random(-1, 1) * width / 2,
        y: random(-1, 1) * height / 2
    }
}

function spawnPolygonVertices(n) {
    let vtxs = []
    for (let i = 0; i < n; i++) {
        let x = width * 0.4 * cos(TAU / n * i)
        let y = height * 0.4 * sin(TAU / n * i)
        vtxs[i] = { x: x, y: y }
    }
    return vtxs
}

function drawControls() {
    text(divRatioSlider.value(), 310, 25);
    text("progress: " + round(animationCount * 100.0 / maxAnimationCount) + "%", 10, 50);
}

function drawPoint() {
    let vertex = random(vertices)

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
