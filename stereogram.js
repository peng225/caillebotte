let distVirtualPlaneAndScreen = 500.0;
let distScreenAndFace = 500.0;
let distBetweenEyes = 150.0;
let sphereCenter
let sphereOrbitRadius
let leftMarkX, rightMarkX, markY
let baseDotPosList = []
const parentID = 'artwork-canvas'

function setup() {
    canvas = createCanvas(500, 600, P2D);
    canvas.parent(parentID)
    sphereOrbitRadius = width / 3.0
    sphereCenter = createVector(sphereOrbitRadius, 0, 0)

    let virtualPos = createVector(0, 100, 0)
    rightMarkX = getProjectedXForRightEye(virtualPos);
    leftMarkX = getProjectedXForLeftEye(virtualPos);
    markY = distScreenAndFace * virtualPos.y / (distScreenAndFace + distVirtualPlaneAndScreen - virtualPos.z);

    for (let i = 0; i < 1000; i++) {
        let iniX = random(width) - width / 2;
        let iniY = random(width) - width / 2;
        append(baseDotPosList, [iniX, iniY])
    }
    frameRate(20)
}

function draw() {
    noFill()
    colorMode(RGB)
    stroke(0, 0, 0)
    background(255, 255, 255);
    rect(0, 0, width, height)

    translate(width / 2, 0);

    // Draw two marks.
    fill(0, 0, 0)
    circle(rightMarkX, markY, 10);
    circle(leftMarkX, markY, 10);

    sphereCenter.x = sphereOrbitRadius * cos(frameCount / 100.0 * PI)
    sphereCenter.y = sphereOrbitRadius * sin(frameCount / 100.0 * PI)

    translate(0, 320);

    colorMode(HSB);
    noStroke();
    for (let i = 0; i < baseDotPosList.length; i++) {
        // Select a random color.
        fill(round(360 * i / baseDotPosList.length), 100, 1000);

        let screenX = baseDotPosList[i][0];
        let screenY = baseDotPosList[i][1];
        circle(screenX, screenY, 5);
        while (true) {
            // See the point (screenX, screenY) from the left eye.
            virtualPos = getVirtualPos(screenX, screenY, -distBetweenEyes, sphereCenter);
            projectedXForRightEye = getProjectedXForRightEye(virtualPos);
            if (abs(projectedXForRightEye) < width / 2.0) {
                circle(projectedXForRightEye, screenY, 5);
                screenX = projectedXForRightEye;
            } else {
                break;
            }
        }

        screenX = baseDotPosList[i][0];
        while (true) {
            // See the point (screenX, screenY) from the left eye.
            virtualPos = getVirtualPos(screenX, screenY, distBetweenEyes, sphereCenter);
            projectedXForLeftEye = getProjectedXForLeftEye(virtualPos);
            if (abs(projectedXForLeftEye) < width / 2.0) {
                circle(projectedXForLeftEye, screenY, 5);
                screenX = projectedXForLeftEye;
            } else {
                break;
            }
        }
    }
}

function getVirtualPos(
    screenX,
    screenY,
    eyeX,
    sphereCenter
) {
    let face2ScreenAndFace2VirtualPlaneRatio = (distScreenAndFace + distVirtualPlaneAndScreen) / distScreenAndFace;
    let virtualPlaneX = eyeX + face2ScreenAndFace2VirtualPlaneRatio * (screenX - eyeX);
    let virtualPlaneY = face2ScreenAndFace2VirtualPlaneRatio * screenY;

    let direction = createVector(screenX - virtualPlaneX, screenY - virtualPlaneY, distVirtualPlaneAndScreen)

    const r = width * 0.3

    // Get the intersection of the line and the sphere.
    // ref. https://chatgpt.com/share/67b5edf4-73b4-8002-a48c-bf76ef71cb5d
    let A = direction.x ** 2 + direction.y ** 2 + direction.z ** 2;
    let B = 2 * (
        direction.x * (virtualPlaneX - sphereCenter.x)
        + direction.y * (virtualPlaneY - sphereCenter.y)
        - direction.z * sphereCenter.z
    );
    let C = (virtualPlaneX - sphereCenter.x) ** 2 + (virtualPlaneY - sphereCenter.y) ** 2 + sphereCenter.z ** 2 - r ** 2;

    // If the intersection of the line and the sphere does not exist,
    // return the intersection of the line and the virtual plane.
    if (B ** 2 - 4 * A * C < 0) {
        return createVector(virtualPlaneX, virtualPlaneY, 0);
    }

    t = (-B + sqrt(B ** 2 - 4 * A * C)) / (2 * A);

    return createVector(virtualPlaneX + direction.x * t, virtualPlaneY + direction.y * t, direction.z * t);
}

function getProjectedXForRightEye(virtualPos) {
    return (distScreenAndFace * virtualPos.x - distBetweenEyes * virtualPos.z + distBetweenEyes * distVirtualPlaneAndScreen)
        / (distScreenAndFace + distVirtualPlaneAndScreen - virtualPos.z)
}

function getProjectedXForLeftEye(virtualPos) {
    return (distScreenAndFace * virtualPos.x + distBetweenEyes * virtualPos.z - distBetweenEyes * distVirtualPlaneAndScreen)
        / (distScreenAndFace + distVirtualPlaneAndScreen - virtualPos.z)
}
