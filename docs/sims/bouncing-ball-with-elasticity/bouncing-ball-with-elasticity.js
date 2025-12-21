const canvasHeight = 360;
const gravity = 0.35;

const elasticitySlider = document.getElementById("elasticity-slider");
const elasticityValue = document.getElementById("elasticity-value");
const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");

const state = {
  paused: false,
};

let ball;

function getElasticity() {
  return parseFloat(elasticitySlider.value);
}

function updateElasticityReadout() {
  const elasticity = getElasticity();
  elasticityValue.textContent = elasticity.toFixed(2);
  elasticitySlider.setAttribute("aria-valuenow", elasticity.toFixed(2));
}

if (elasticitySlider) {
  elasticitySlider.addEventListener("input", () => {
    updateElasticityReadout();
  });
}

function togglePause() {
  state.paused = !state.paused;
  pauseBtn.textContent = state.paused ? "Resume" : "Pause";
}

function restartSimulation() {
  state.paused = false;
  pauseBtn.textContent = "Pause";
  if (ball) {
    ball.reset();
  }
}

pauseBtn?.addEventListener("click", togglePause);
restartBtn?.addEventListener("click", restartSimulation);

class Ball {
  constructor() {
    this.radius = 26;
    this.reset();
  }

  reset() {
    this.position = createVector(width / 2, height / 3);
    this.velocity = createVector(random(-2.2, 2.2), random(0.5, 2));
  }

  update() {
    this.velocity.y += gravity;
    this.position.add(this.velocity);

    const elasticity = getElasticity();

    if (this.position.y + this.radius >= height) {
      this.position.y = height - this.radius;
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
    const shadowOffset = map(this.position.y, 0, height, 8, 2);
    fill(0, 0, 0, 40);
    ellipse(this.position.x + shadowOffset, height - 7, this.radius * 1.8, 10);

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

function setup() {
  const canvas = createCanvas(getCanvasWidth(), canvasHeight);
  canvas.parent("p5-canvas");
  ball = new Ball();
  updateElasticityReadout();
}

function drawBackground() {
  background(232, 245, 255);
  noStroke();
  fill(222, 235, 247);
  rect(0, height - 60, width, 60);

  stroke(255);
  strokeWeight(1);
  for (let y = height - 60; y <= height - 20; y += 10) {
    line(0, y, width, y);
  }

  noStroke();
  fill(0, 0, 0, 25);
  textSize(14);
  textAlign(LEFT, TOP);
  text(
    `Elasticity: ${getElasticity().toFixed(2)}\nGravity: ${gravity.toFixed(
      2
    )} m/s²`,
    16,
    12
  );

  textAlign(RIGHT, TOP);
  const kineticEnergy =
    0.5 * (ball.velocity.x ** 2 + ball.velocity.y ** 2) * ball.radius * 0.01;
  text(`Relative energy: ${kineticEnergy.toFixed(2)}`, width - 16, 12);
}

function draw() {
  drawBackground();

  if (!state.paused) {
    ball.update();
  }

  ball.draw();

  if (state.paused) {
    drawPauseOverlay();
  }
}

function drawPauseOverlay() {
  push();
  fill(0, 0, 0, 120);
  rect(0, 0, width, height);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Paused\nPress Resume to continue", width / 2, height / 2);
  pop();
}

function getCanvasWidth() {
  const container = document.querySelector(".canvas-container");
  const fallback = window.innerWidth - 40;
  const containerWidth = container?.clientWidth || fallback;
  return Math.max(320, Math.min(820, containerWidth - 32));
}

function windowResized() {
  resizeCanvas(getCanvasWidth(), canvasHeight);
}
