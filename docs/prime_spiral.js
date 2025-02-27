import * as layout from "./layout.js"

const parentID = 'artwork-canvas'
const maxNumber = 2000
let scale
let primes
let currentNumber


const s = (p) => {
    p.setup = function () {
        let canvasWidth = layout.calcCanvasWidth(p, parentID)
        let canvas = p.createCanvas(canvasWidth, canvasWidth, p.P2D)
        canvas.parent(parentID)
        p.frameRate(30)
        p.textSize(18)

        scale = p.width * 2.0 / 5000
        primes = []
        currentNumber = 1
    };

    p.windowResized = function () {
        let canvasWidth = layout.calcCanvasWidth(p, parentID)
        if (canvasWidth == p.width) {
            return
        }
        p.resizeCanvas(canvasWidth, canvasWidth);
        scale = p.width * 2.0 / 5000
    }

    p.draw = function () {
        p.colorMode(p.RGB)
        p.background(150);
        if (currentNumber <= maxNumber) {
            if (isPrime(currentNumber)) {
                primes.push(currentNumber)
            }
            currentNumber++
        }

        p.translate(p.width / 2, p.height / 2)
        p.noStroke()
        const colorMax = p.round(p.TAU * 100)
        const diameter = 6
        p.colorMode(p.HSB, colorMax)
        for (let i = 0; i < primes.length; i++) {
            p.fill((primes[i] * 100) % colorMax, colorMax * 0.8, colorMax)
            p.circle(scale * primes[i] * p.cos(primes[i]), scale * primes[i] * p.sin(primes[i]), diameter)
        }

        p.fill(0);
        for (let i = primes.length - 1; i >= 0; i--) {
            let circleX = scale * primes[i] * p.cos(primes[i])
            let circleY = scale * primes[i] * p.sin(primes[i])
            if (p.mouseX != 0 && p.mouseY != 0 &&
                p.dist(circleX, circleY, p.mouseX - p.width / 2, p.mouseY - p.height / 2) <= diameter) {
                let textX = circleX + 20
                let textY = circleY + 20
                if (textX > p.width * 0.9 / 2) {
                    textX = circleX - 50
                }
                if (textY > p.height * 0.9 / 2) {
                    textY = circleY
                }
                p.text(primes[i], textX, textY)
                break
            }
        }
    };
};

function isPrime(n) {
    if (n < 2) {
        return false;
    }
    if (n === 2 || n === 3) {
        return true;
    }
    if (n % 2 === 0 || n % 3 === 0) {
        return false;
    }

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

let myp5 = new p5(s);
