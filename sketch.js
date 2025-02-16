const initialBird = new Bird(100, GameState.viewHeight / 2, 10, 10);
let bird = initialBird;
let pipeFactory = new PipeFactory();

function setup() {
	createCanvas(GameState.viewWidth, GameState.viewHeight);
}

function draw() {
	background("aqua");

	stroke("black");
	strokeWeight(2);

	bird.render();
	pipeFactory.update();

	checkGameState();
}

function keyPressed() {
	if (GameState.gameOver && keyIsDown(32)) {
		GameState.gameOver = false;
		bird = initialBird;
		pipeFactory = new PipeFactory();
		loop();
	}
}

function checkGameState() {
	if (
		pipeFactory.locationTouchesPipe(
			bird.locX,
			bird.locY,
			bird.width,
			bird.height
		)
	) {
		fill("white");
		textSize(32);
		stroke("black");
		strokeWeight(4);
		text("Game Over", GameState.viewWidth / 2 - 50, GameState.viewHeight / 2);
		GameState.gameOver = true;
		noLoop();
	}
}
