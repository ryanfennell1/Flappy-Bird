let viewWidth = 800;
let viewHeight = 600;
let firstKeyPressed = false;
const flappy = new bird(100, viewHeight / 2, 10, 10);

function setup() {
	createCanvas(viewWidth, viewHeight);
}

function draw() {
	background("aqua");

	if (keyIsDown(32)) {
		firstKeyPressed = true;
		flappy.flap();
	} else if (firstKeyPressed) {
		flappy.notFlapping();
	}

	flappy.draw();
}
