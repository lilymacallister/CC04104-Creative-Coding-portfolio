# Experiment 1: Clock
This experiment responds to the prompt: "An alternative visual way to represent a realtime clock."

My approach to this was inspired by two things: fireworks and grandfather clocks. Many grandfather clocks play a large sound on the hour, with the number of notes corresponding to the hour it plays on; I took inspiration from this by adding a firework effect to every second on the clock.
Every second, a red firework will spawn at the centre, with the number of sparks based on the current second in the minute. Every minute, green sparks will burst from the top, with the number based on the current minute in the hour. Finally, on the hour, a large blue burst will come from the top.

```
  tick() {
    this.x += this.dx;
    this.y += this.dy;
    this.dx *= 0.99;
    this.dy += 0.1;
  }
```
This code is a part of the particle class, used in the fireworks; the particles track their position coordinates, which are used when rendering, as well as their current motion. The x motion is multiplied to simulate friction, while a constant is added to the y motion to simulate gravity.

One aspect I struggled with when creating this was making sure the particles felt realistic and interesting to look at - it was important to make sure that they would fly at the right angles and speeds, particularly with the bursts at the top, otherwise they would feel too close to each other or too random.

The scrolling background on both the wall and the clock wasn't part of my original plan, and I first implemented it to help test, so that I could see the progress of the minute and hour; however, I think it does add a bit more utility to the clock, and so I decided to keep it.

The main project can be viewed [here](/clock/index1.html).
A second version of the project with a sped up timer can be viewed [here](/clock/index2.html). *(This version runs with 10 seconds in a minute and 6 minutes in an hour to ensure you can see the different effects at all times.)*
You can press 'm' or 'h' on both projects to show the minute and hour effect respectively.
