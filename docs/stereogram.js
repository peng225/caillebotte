import * as layout from "./layout.js"

let distVirtualPlaneAndScreen = 500.0;
let distScreenAndFace = 500.0;
let distBetweenEyes = 150.0;
let sphereCenter
let sphereOrbitRadius
let leftMarkX, rightMarkX, markY
let baseDotPosList
const parentID = 'artwork-canvas'
const markAreaHeightRatio = 0.1

const s = (p) => {
    function init() {
        sphereOrbitRadius = p.width / 3.0
        sphereCenter = p.createVector(sphereOrbitRadius, 0, 0)

        let virtualPos = p.createVector(0, p.height * 0.12, 0)
        rightMarkX = getProjectedXForRightEye(virtualPos);
        leftMarkX = getProjectedXForLeftEye(virtualPos);
        markY = distScreenAndFace * virtualPos.y / (distScreenAndFace + distVirtualPlaneAndScreen - virtualPos.z);

        baseDotPosList = []
        for (let i = 0; i < 1000; i++) {
            let iniX = p.random(p.width) - p.width / 2;
            let iniY = p.random(p.height * (1.0 - markAreaHeightRatio)) - (p.height * (1.0 - markAreaHeightRatio)) / 2;
            p.append(baseDotPosList, [iniX, iniY])
        }
    }
    p.setup = function () {
        let canvasWidth = layout.calcCanvasWidth(p, parentID)
        let canvas = p.createCanvas(canvasWidth, canvasWidth * (1.0 + markAreaHeightRatio), p.P2D)
        canvas.parent(parentID)
        init()
        p.frameRate(20)
    };

    p.windowResized = function () {
        let canvasWidth = layout.calcCanvasWidth(p, parentID)
        p.resizeCanvas(canvasWidth, canvasWidth * (1.0 + markAreaHeightRatio));
        init()
    }

    p.draw = function () {
        p.noFill()
        p.colorMode(p.RGB)
        p.stroke(0, 0, 0)
        p.background(255, 255, 255);
        p.rect(0, 0, p.width, p.height)

        p.translate(p.width / 2, 0);

        // Draw two marks.
        p.fill(0, 0, 0)
        p.circle(rightMarkX, markY, 10);
        p.circle(leftMarkX, markY, 10);

        sphereCenter.x = sphereOrbitRadius * p.cos(p.frameCount / 100.0 * p.PI)
        sphereCenter.y = sphereOrbitRadius * p.sin(p.frameCount / 100.0 * p.PI)

        p.translate(0, p.height * (markAreaHeightRatio + (1.0 - markAreaHeightRatio) / 2));

        p.colorMode(p.HSB);
        p.noStroke();
        for (let i = 0; i < baseDotPosList.length; i++) {
            // Select a random color.
            p.fill(p.round(360 * i / baseDotPosList.length), 100, 1000);

            let screenX = baseDotPosList[i][0];
            let screenY = baseDotPosList[i][1];
            p.circle(screenX, screenY, 5);
            while (true) {
                // See the point (screenX, screenY) from the left eye.
                let virtualPos = getVirtualPos(screenX, screenY, -distBetweenEyes, sphereCenter);
                let projectedXForRightEye = getProjectedXForRightEye(virtualPos);
                if (p.abs(projectedXForRightEye) < p.width / 2.0) {
                    p.circle(projectedXForRightEye, screenY, 5);
                    screenX = projectedXForRightEye;
                } else {
                    break;
                }
            }

            screenX = baseDotPosList[i][0];
            while (true) {
                // See the point (screenX, screenY) from the left eye.
                let virtualPos = getVirtualPos(screenX, screenY, distBetweenEyes, sphereCenter);
                let projectedXForLeftEye = getProjectedXForLeftEye(virtualPos);
                if (p.abs(projectedXForLeftEye) < p.width / 2.0) {
                    p.circle(projectedXForLeftEye, screenY, 5);
                    screenX = projectedXForLeftEye;
                } else {
                    break;
                }
            }
        }
    };

    function getVirtualPos(
        screenX,
        screenY,
        eyeX,
        sphereCenter
    ) {
        let face2ScreenAndFace2VirtualPlaneRatio = (distScreenAndFace + distVirtualPlaneAndScreen) / distScreenAndFace;
        let virtualPlaneX = eyeX + face2ScreenAndFace2VirtualPlaneRatio * (screenX - eyeX);
        let virtualPlaneY = face2ScreenAndFace2VirtualPlaneRatio * screenY;

        let direction = p.createVector(screenX - virtualPlaneX, screenY - virtualPlaneY, distVirtualPlaneAndScreen)

        const r = p.width * 0.3

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
            return p.createVector(virtualPlaneX, virtualPlaneY, 0);
        }

        let t = (-B + p.sqrt(B ** 2 - 4 * A * C)) / (2 * A);

        return p.createVector(virtualPlaneX + direction.x * t, virtualPlaneY + direction.y * t, direction.z * t);
    }

    function getProjectedXForRightEye(virtualPos) {
        return (distScreenAndFace * virtualPos.x - distBetweenEyes * virtualPos.z + distBetweenEyes * distVirtualPlaneAndScreen)
            / (distScreenAndFace + distVirtualPlaneAndScreen - virtualPos.z)
    }

    function getProjectedXForLeftEye(virtualPos) {
        return (distScreenAndFace * virtualPos.x + distBetweenEyes * virtualPos.z - distBetweenEyes * distVirtualPlaneAndScreen)
            / (distScreenAndFace + distVirtualPlaneAndScreen - virtualPos.z)
    }
};

let myp5 = new p5(s);
