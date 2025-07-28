import * as util from "../util";
import p5 from "p5";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const s = (p: p5) => {
  const parentIDKey = "artworkCanvas";

  let parentID: string;

  let f1: p5.Vector;
  let f2: p5.Vector;
  let center: p5.Vector;
  let a: number;
  let b: number;
  const particleCountPerClick = 30;
  const maxParticleCount = particleCountPerClick * 20;
  const starCount = 200;

  let particles: Particle[] = [];
  const stars: Star[] = [];

  function drawFocalPoint(pos: p5.Vector, glowColor: p5.Color) {
    p.push();
    p.noStroke();
    for (let r = 20; r > 0; r -= 2) {
      p.fill(p.red(glowColor), p.green(glowColor), p.blue(glowColor), p.map(r, 20, 0, 10, 200));
      p.ellipse(pos.x, pos.y, r * util.canvasSizeRatio(p));
    }
    p.fill(glowColor);
    p.ellipse(pos.x, pos.y, 6 * util.canvasSizeRatio(p));
    p.pop();
  }

  function setEllipseParams() {
    a = p.width * 0.4;
    b = p.height * 0.3;
    center = p.createVector(p.width / 2, p.height / 2);
    const distBetweenFocuses = p.sqrt(a * a - b * b);
    f1 = p.createVector(center.x - distBetweenFocuses, center.y);
    f2 = p.createVector(center.x + distBetweenFocuses, center.y);
  }

  p.setup = function () {
    const tmpParentID = p.select('[id*="' + parentIDKey + '"]')?.id();
    if (tmpParentID == null) {
      console.log("Failed to get the parentID.");
      p.noLoop();
      return;
    }
    parentID = tmpParentID;
    const canvasWidth = util.calcCanvasWidth(p, parentID);
    const canvas = p.createCanvas(canvasWidth, canvasWidth, p.P2D);
    canvas.parent(parentID);

    setEllipseParams();

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star(p.createVector(p.random(p.width), p.random(p.height))));
    }

    p.noStroke();
  };

  function addParticles(startFromLeft: boolean) {
    for (let i = 0; i < particleCountPerClick; i++) {
      const angle = p.map(i, 0, particleCountPerClick, 0, 2 * Math.PI);
      if (startFromLeft) {
        particles.push(new Particle(f1.copy(), p5.Vector.fromAngle(angle), f2));
      } else {
        particles.push(new Particle(f2.copy(), p5.Vector.fromAngle(angle), f1));
      }
    }
  }

  p.mousePressed = function () {
    if (particles.length >= maxParticleCount) {
      return;
    }
    if (util.cursorOnCanvas(p)) {
      if (p.mouseX <= center.x) {
        addParticles(true);
      } else {
        addParticles(false);
      }
    }
  };

  p.windowResized = function () {
    const canvasWidth = util.calcCanvasWidth(p, parentID);
    if (canvasWidth === p.width) {
      return;
    }
    p.resizeCanvas(canvasWidth, canvasWidth);
    setEllipseParams();
    for (const particle of particles) {
      particle.updateSpeed();
    }
    particles = [];
  };

  p.draw = function () {
    p.background(0);
    for (const star of stars) {
      star.update();
      star.draw();
    }

    // Ellipse
    p.noFill();
    p.stroke(255, 100);
    p.strokeWeight(1.5);
    p.ellipse(center.x, center.y, a * 2, b * 2);

    // Focal points
    p.fill(255, 0, 0);
    p.noStroke();
    drawFocalPoint(f1, p.color(255, 200, 100));
    drawFocalPoint(f2, p.color(100, 180, 255));

    // Particles
    for (const particle of particles) {
      particle.update();
      particle.draw();
    }
    particles = particles.filter((particle) => !particle.dead());
  };

  class Star {
    pos: p5.Vector;
    brightness: number;
    diameter: number;
    twinklePeriod: number;

    constructor(pos: p5.Vector) {
      this.pos = pos;
      this.brightness = this.generateBrightness();
      this.diameter = this.generateDiameter();
      this.twinklePeriod = Math.floor(Math.random() * 10) + 10;
    }

    generateBrightness(): number {
      return p.random(50, 150);
    }

    generateDiameter(): number {
      return p.random(1, 2);
    }

    update() {
      if (p.frameCount % this.twinklePeriod === 0) {
        this.brightness = this.generateBrightness();
        this.diameter = this.generateDiameter();
      }
    }

    draw() {
      p.fill(255);
      p.fill(this.brightness);
      p.circle(this.pos.x, this.pos.y, this.diameter);
    }
  }

  class Particle {
    pos: p5.Vector;
    velocity: p5.Vector;
    target: p5.Vector;
    col: p5.Color;
    age: number;
    state: "toEllipse" | "toFocus";
    endOfLifeAge: number = 480;
    speed: number = 3 * util.canvasSizeRatio(p);

    constructor(startPos: p5.Vector, direction: p5.Vector, target: p5.Vector) {
      this.pos = startPos.copy();
      this.velocity = direction.copy().setMag(this.speed);
      this.target = target;
      this.col = p.color(p.random(220, 255), p.random(220, 255), p.random(100, 150), 255);
      this.age = 0;
      this.state = "toEllipse";
    }

    insideOfEllipse(): boolean {
      const rel = p5.Vector.sub(this.pos, center);
      const eq = (rel.x * rel.x) / (a * a) + (rel.y * rel.y) / (b * b);
      return eq < 1.0;
    }

    closeToTarget(): boolean {
      return p5.Vector.dist(this.pos, this.target) < 5;
    }

    update() {
      this.pos.add(this.velocity);

      if (this.state === "toEllipse") {
        if (!this.insideOfEllipse()) {
          this.velocity = p5.Vector.sub(this.target, this.pos).normalize().mult(this.speed);
          this.state = "toFocus";
        }
      } else if (this.state === "toFocus") {
        if (this.closeToTarget()) {
          this.target = this.target === f2 ? f1 : f2;
          this.state = "toEllipse";
        }
      }
      this.age++;
    }

    updateSpeed() {
      this.speed = 3 * util.canvasSizeRatio(p);
    }

    dead(): boolean {
      return this.age >= this.endOfLifeAge;
    }

    draw() {
      this.col.setAlpha(255 - (255 * this.age) / this.endOfLifeAge);
      p.fill(this.col);
      p.noStroke();
      p.circle(this.pos.x, this.pos.y, 4 * util.canvasSizeRatio(p));
    }
  }
};

let p5Instance: p5 | undefined = undefined;
export default function Kick() {
  const pathname = usePathname();
  useEffect(() => {
    if (p5Instance === undefined) {
      p5Instance = new p5(s);
    }
    return () => {
      p5Instance?.remove();
      p5Instance = undefined;
    };
  }, [pathname]);
  return <></>;
}
