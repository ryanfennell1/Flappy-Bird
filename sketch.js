const initialBird = new Bird(100, GameState.viewHeight / 2, 15, 15);
let bird = initialBird;
let pipeFactory = new PipeFactory();

function setup() {
	createCanvas(GameState.viewWidth, GameState.viewHeight);
}

// p5 rendering function
function draw() {
	background("aqua");
	stroke("black");
	strokeWeight(2);

	bird.render();
	pipeFactory.update();

	checkGameState();
	renderScore();
}

// check for restart after game over
function keyPressed() {
	if (GameState.gameOver && keyIsDown(32)) {
		GameState.gameOver = false;
		bird = initialBird;
		pipeFactory = new PipeFactory();
		GameState.score = 0;
		loop();
	}
}

// chekc for game events, game over and scoring
function checkGameState() {
	if (pipeFactory.birdTouchesPipe(bird)) {
		fill("white");
		textSize(32);
		stroke("black");
		strokeWeight(4);
		text("Game Over", GameState.viewWidth / 2 - 50, GameState.viewHeight / 2);
		GameState.gameOver = true;
		noLoop();
	} else if (pipeFactory.inScoreRange(bird)) {
		GameState.score++;
	}
}

// scoreboard
function renderScore() {
	fill("white");
	textSize(16);
	stroke("black");
	strokeWeight(4);
	rect(GameState.scoreBoardX, GameState.scoreBoardY, 100, 30);
	fill("black");
	strokeWeight(0);
	text(
		"Score: " + GameState.score,
		GameState.scoreBoardX + 5,
		GameState.scoreBoardY + 20
	);
}
