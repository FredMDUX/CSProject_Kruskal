var locations = [];
var totalLocations = 7;
var order = [];

var recordDistance;
var bestEver;

function setup() {
  createCanvas(700, 550);
  
  for (var i = 0; i < 7; i++) {
    var v = createVector(random(width), random(height/2));
    locations.push(v);
    order[i] = i;
  }
  var d = calcDistance(locations);
  recordDistance = d;
  bestEver = locations.slice();
}

function draw() {
  //frameRate(2000000);
  background(0);
  fill(255);
  for (var i = 0; i < locations.length; i++) {
    ellipse(locations[i].x, locations[i].y, 10, 10)
  }
  
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (var i = 0; i < locations.length; i++) {
    vertex(locations[i].x, locations[i].y)
  }
  endShape();
  
  //ReDrawing the current path - the bestEver
  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < locations.length; i++) {
    vertex(bestEver[i].x, bestEver[i].y)
  }
  endShape();
  
  var i = floor(random(locations.length));
  var j = floor(random(locations.length));
  swap(locations, i, j);
  
  //finding the optimal distance and saving it in recordDistance
  var d = calcDistance(locations);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = locations.slice();
    console.log("The distance is ", recordDistance)
  }
  
  textSize(64);
  var s = '';
  for (var i = 0; i < order.length; i++) {
    s += order[i];
  }
  fill(255);
  text(s, 20, height - 50);
  
  nextOrder();
}

//explores a lot of possibilities
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

//This function returns the total distance between all the points in the order that they are
function calcDistance(points) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    sum += d;
  }
  return sum;
}







// This is my lexical ordering algorithm

function nextOrder() {


// Step 1 of the algorithm
  // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
  var largest_i = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i+1]) {
      largest_i = i;
    }
  }
  if (largest_i == -1) {
    noLoop();
    console.log('finished');
  }
  //console.log("largest_i", largest_i);
  
  // Step 2
  var largest_j = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largest_i] < order[j]) {
      largest_j = j;
    }
  }
  
  //console.log("largest_j", largest_j);
  
  // Step 3
  swap(order, largest_i, largest_j);
  
  // Step 4: reverse from largest_i + 1 to the end
  var endArray = order.splice(largest_i + 1);
  endArray.reverse();
  order = order.concat(endArray);
  
}
