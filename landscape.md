# Experiment 2: Landscape Generator
This experiment responds to the prompt: "A city or landscape generator, with at least 3 distinct types of building or land."

This experiment is loosely based on videogames such as Minecraft and Terraria which use procedural generation to create the game world. I used noise here to create a smooth and random landscape, then populated it with features such as trees or cacti depending on the biome.

![Image of a forest landscape](/images/landscape.png)

```
  beginShape();
  curveVertex(points[0].x, 1000);
  points.forEach(function(point) {
    curveVertex(point.x, point.y);
  });
  curveVertex(points[points.length - 1].x, 1000);
  curveVertex(points[0].x, 1000);
  curveVertex(points[0].x, points[0].y);
  endShape();
```
To draw the terrain, a set of points are generated with the noise function, which are then connected with p5's curve functions. Additional points are then added off-screen to ensure the shape connects at the bottom to form the underground part of the terrain.
The list of points is also slightly longer than the amount which would be shown on screen to make sure they all connect smoothly, as otherwise the shape would curve down too early.

```
class Node {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.children = [];
  }
  
  addChild(dx, dy) {
    let newNode = new Node(this.x + dx, this.y + dy, this.d + 1);
    this.children.push(newNode);
    return newNode;
  }
}
```
A node system is used for the trees, where they start from a base point and connect to others. This allows branches to be connecting to the main trunk, with further branches coming off of these, and so on.
The trees then have their own functions to display them, such as showing leaves on ending nodes.

An additional aspect I added while testing was a chance for rain to appear - this effectively doubles the number of environments as it has a significant change to the feel of each one.
If I were to work further on this project, I would add other events like this, such as thunder storms and clouds; other additions to the environments could be interesting too, such as lakes and caves, or the ability for biomes to change as the terrain generates.

The main project can be viewed [here](/landscape/index1.html).

A version with the noisiness and height multiplier increased can be found [here](/landscape/index2.html).

A version with the noisiness and height multiplier decreased and the scroll speed increased can be found [here](/landscape/index1.html).
