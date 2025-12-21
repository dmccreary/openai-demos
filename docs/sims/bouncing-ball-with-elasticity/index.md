# Bouncing Ball with Elasticity

<iframe
  src="./main.html"
  title="Bouncing Ball with Elasticity MicroSim"
  loading="lazy"
  width="100%"
  height="560"
  style="border: 1px solid #d0d0d0; border-radius: 8px;"
></iframe>

## How to Use the Simulation

1. Press **Pause** to stop the motion and talk through predictions, then press **Resume** to confirm what happens.
2. Drag the **Elasticity slider** toward 1.0 to show nearly perfect energy conservation or lower it toward 0.3 to demonstrate why balls eventually stop bouncing.
3. Click **Restart** any time you want to re-seed the simulation and highlight how initial velocity affects the pattern of collisions.

The MicroSim is implemented with [p5.js](https://p5js.org/); copy the contents of `bouncing-ball-with-elasticity.js` into the [online editor](https://editor.p5js.org/) for quick experimentation.

## Controls

| Control | Purpose |
| --- | --- |
| Elasticity slider (0.30–1.00) | Sets the coefficient of restitution used for every collision with the floor or walls. |
| Pause / Resume | Freezes the animation to support step-by-step discussion. |
| Restart | Resets the ball position and velocity so students can run fresh trials. |

## Educational Overview

- **Subject Area:** Physics – Energy Transfer & Collisions  
- **Grade Level:** Middle School (6–8) and introductory High School Physics  
- **Lesson Duration:** 10 minutes of guided exploration or 15 minutes including a quick formative check  
- **Prior Knowledge:** Students should already recognize gravity as a constant acceleration and know that kinetic energy depends on velocity.

### Learning Objectives

1. Observe how elasticity governs the amount of energy conserved after a collision.
2. Compare the effect of partial energy loss on bounce height and horizontal travel.
3. Predict when motion will eventually stop as elasticity is reduced.

### Assessment Ideas

- Have students run two trials with different elasticity values and describe the differences in observed energy loss.
- Ask learners to pause the motion near the peak of a bounce and sketch the velocity vectors they expect next.
- Challenge teams to set an elasticity value that keeps the ball in motion for at least 20 seconds, explaining why it worked.

## Classroom Tips

- Pair this MicroSim with ball-drop demonstrations to bridge the gap between model and physical experience.
- Use the on-screen readouts to introduce the concept of relative kinetic energy before moving to formal calculations.
- Encourage students to connect elasticity to real-world materials (rubber, clay, tennis ball felt, etc.).
