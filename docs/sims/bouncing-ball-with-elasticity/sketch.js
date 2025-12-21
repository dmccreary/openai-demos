const gravity = 0.35;

let canvasWidth = 720;
const drawHeight = 360;
const controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;

let canvas;
let elasticitySlider;
let pauseBtn;
let restartBtn;

const state = {
  paused: false,
  elasticity: 0.8,
};

let ball;

function setup() {
  updateCanvasSize(false);
  canvas = createCanvas(canvasWidth, canvasHeight);
  const mount = document.querySelector("main") || document.body;
  canvas.parent(mount);
  canvas.elt.setAttribute(
    "aria-label",
    "Interactive canvas showing a ball bouncing with adjustable elasticity."
  );
  describe("Ball bouncing in a rectangle with adjustable elasticity");

  createControls();
  positionControls();

  ball = new Ball();
}

function createControls() {
  elasticitySlider = createSlider(0.3, 1, state.elasticity, 0.05);
  elasticitySlider.input(() => {
    state.elasticity = elasticitySlider.value();
  });

  pauseBtn = createButton("Pause");
  pauseBtn.mousePressed(() => {
    state.paused = !state.paused;
    pauseBtn.html(state.paused ? "Resume" : "Pause");
  });

  restartBtn = createButton("Restart");
  restartBtn.mousePressed(() => {
    state.paused = false;
    pauseBtn.html("Pause");
    if (ball) {
      ball.reset();
    }
  });
}

function updateCanvasSize(resizeExisting = true) {
  const container = document.querySelector("main") || document.body;
  const containerWidth = container.clientWidth || window.innerWidth;
  const newWidth = constrain(containerWidth - 32, 320, 960);
  if (newWidth !== canvasWidth) {
    canvasWidth = newWidth;
    canvasHeight = drawHeight + controlHeight;
    if (resizeExisting && canvas) {
      resizeCanvas(canvasWidth, canvasHeight);
    }
  }
}

function positionControls() {
  if (!canvas) return;
  const rect = canvas.elt.getBoundingClientRect();
  const offsetX = rect.left + window.scrollX;
  const offsetY = rect.top + window.scrollY;

  const sliderWidth = Math.max(160, canvasWidth - 220);
  elasticitySlider.position(offsetX + 180, offsetY + drawHeight + 15);
  elasticitySlider.style("width", `${sliderWidth}px`);

  pauseBtn.position(offsetX + 40, offsetY + drawHeight + 60);
  restartBtn.position(offsetX + 160, offsetY + drawHeight + 60);
}

function getElasticity() {
  return parseFloat(elasticitySlider?.value() ?? state.elasticity);
}

class Ball {
  constructor() {
    this.radius = 26;
    this.reset();
  }

  reset() {
    this.position = createVector(width / 2, drawHeight / 3);
    this.velocity = createVector(random(-2.2, 2.2), random(0.5, 2));
  }

  update() {
    this.velocity.y += gravity;
    this.position.add(this.velocity);

    const elasticity = getElasticity();

    if (this.position.y + this.radius >= drawHeight) {
      this.position.y = drawHeight - this.radius;
      this.velocity.y *= -elasticity;
      if (abs(this.velocity.y) < 0.15) {
        this.velocity.y = 0;
      }
    }

    if (this.position.x + this.radius >= width) {
      this.position.x = width - this.radius;
      this.velocity.x *= -elasticity;
    }

    if (this.position.x - this.radius <= 0) {
      this.position.x = this.radius;
      this.velocity.x *= -elasticity;
    }
  }

  draw() {
    noStroke();
    const shadowOffset = map(this.position.y, 0, drawHeight, 8, 2);
    fill(0, 0, 0, 40);
    ellipse(
      this.position.x + shadowOffset,
      drawHeight - 7,
      this.radius * 1.8,
      10
    );

    fill(255, 140, 66);
    ellipse(this.position.x, this.position.y, this.radius * 2);

    fill(255, 255, 255, 120);
    ellipse(
      this.position.x - this.radius / 2.5,
      this.position.y - this.radius / 2.5,
      this.radius * 0.8
    );
  }
}

function draw() {
  updateCanvasSize();
  positionControls();
  drawRegions();
  drawOverlayText();

  if (!state.paused) {
    ball.update();
  }

  push();
  translate(0, 0);
  ball.draw();
  pop();

  drawControlLabels();

  if (state.paused) {
    drawPauseOverlay();
  }
}

function drawRegions() {
  noStroke();
  fill(232, 245, 255);
  rect(0, 0, canvasWidth, drawHeight);

  fill(219, 231, 243);
  rect(0, drawHeight - 60, canvasWidth, 60);

  fill(255);
  stroke(222);
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function drawOverlayText() {
  fill(33);
  textAlign(LEFT, TOP);
  textSize(22);
  text("Bouncing Ball with Elasticity", 24, 16);

  textSize(14);
  fill(60);
  text(
    "Explore how different elasticity values conserve or lose energy during collisions.",
    24,
    48
  );

  fill(0, 0, 0, 25);
  text(
    `Current energy: ${getRelativeEnergy().toFixed(2)} units`,
    canvasWidth - 220,
    18
  );
}

function drawControlLabels() {
  fill(24);
  textAlign(LEFT, CENTER);
  textSize(16);
  text("Elasticity", 24, drawHeight + 25);
  textSize(14);
  fill(80);
  text("0 = no bounce, 1 = perfect bounce", 24, drawHeight + 45);

  fill(20, 90, 160);
  textSize(16);
  text(
    `Current: ${getElasticity().toFixed(2)}`,
    canvasWidth - 160,
    drawHeight + 25
  );

  fill(70);
  text(
    "Restart seeds a new trajectory; Pause freezes motion for predictions.",
    24,
    drawHeight + controlHeight - 20
  );
}

function getRelativeEnergy() {
  if (!ball) {
    return 0;
  }
  return (
    0.5 * (ball.velocity.x ** 2 + ball.velocity.y ** 2) * ball.radius * 0.01
  );
}

function drawPauseOverlay() {
  push();
  fill(0, 0, 0, 120);
  rect(0, 0, canvasWidth, drawHeight);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Paused\nPress Resume to continue", canvasWidth / 2, drawHeight / 2);
  pop();
}

function windowResized() {
  updateCanvasSize();
  positionControls();
}
