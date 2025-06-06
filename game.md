# Experiment 3: One-key game
This experiment responds to the prompt: "One key game (two players) with a clear win state."

My response to this is primarily inspired by a demo I created a few years back on Scratch in which the player would move their character in a similar way to this game.
While that demo only had one player on an island, I adapted it to feature two players, and was inspired by Splatoon to add an objective to colour as much of the field as possible.

![Image of the game in action](/images/game.png)

```
function calcScores() {
  loadPixels();
  pixB = 0;
  pixR = 0;
  pixW = 0;
  for (let x = 55; x <= 745; x += 10) {
    for (let y = 155; y <= 745; y += 10) {
      let r = pixels[x*4 + y*4*800];
      let b = pixels[x*4 + y*4*800 + 2];
      if (r - b > 50) {pixR += 1;}
      else if (b - r > 50) {pixB += 1;}
      else {pixW += 1;}
    }
  }
  pixT = pixB + pixR + pixW;
  sb = pixB / pixT * 100;
  sr = pixR / pixT * 100;
}
```
One of the more difficult aspects of coding this was calculating how much of the board each player has filled. Originally I checked every pixel every frame, however this caused a severe amount of lag; instead, I opted to check one in every hundred pixels (with an interval of ten on each axis) every five frames.
I did try with larger intervals as well, however this caused the scoring to be too inaccurate. To check the colours, the red and blue values of each pixel are compared; if one is greater than the other, then their respective score is increased by one, otherwise the white score is increased by one.
While the white score has no impact on gameplay, it is used to determine the percentage of coverage.

I think the project is slightly lacking in terms of visual presentation, such as the font not being properly aligned in some places and the screen generally looking somewhat uninteresting, but I'm still happy with the result as the gameplay is enjoyable and it works smoothly.

An interesting change in the future could also be to add more customizability, such as the ability to change the players' colours and keybinds, or adding a third player.

The project can be viewed [here](/game/index.html).
