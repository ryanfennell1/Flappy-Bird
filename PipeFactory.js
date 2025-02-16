let gapMin = 150;
let gapMax = 450;
let pipeWidth = 50;
let gapWidth = 100;
let pipeSpacing = 275;
let scrollSpeed = 3;

// Create and manage pipes
class PipeFactory {
	constructor() {
		this.pipes = [];
	}

	// New pipe, add to list
	createPipe() {
		let pipe = new Pipe(gapMin, gapMax, gapWidth);
		this.pipes.push(pipe);
	}

	// Remove pipes when off screen
	removeFrontPipe() {
		this.pipes.splice(0, 1);
	}

	// Check for collision (game over state)
	birdTouchesPipe(bird) {
		if (this.pipes === undefined || !GameState.firstKeyPressed) return false;

		for (let pipe of this.pipes) {
			if (
				bird.locX + bird.width >= pipe.locX &&
				bird.locX <= pipe.locX + pipe.width
			) {
				if (
					bird.locY <= pipe.pipeGap1 ||
					bird.locY + bird.height >= pipe.pipeGap2
				) {
					return true;
				}
			}
		}
		return false;
	}

	// Check for scoring, zone just after pipe within scroll speed
	inScoreRange(bird) {
		if (this.pipes === undefined || !GameState.firstKeyPressed) return;

		let pipe = this.pipes[1];

		for (let pipe of this.pipes.slice(0, 2)) {
			if (
				bird.locX > pipe.locX + pipe.width &&
				bird.locX <= pipe.locX + pipe.width + scrollSpeed
			) {
				return true;
			}
		}
	}

	// Update and render all pipes, create new pipes when we need one
	update() {
		if (this.pipes === undefined || !GameState.firstKeyPressed) return;

		if (
			this.pipes.length == 0 ||
			this.pipes[this.pipes.length - 1].locX < GameState.viewWidth - pipeSpacing
		) {
			this.createPipe();
		}

		for (let pipe of this.pipes) {
			if (pipe.locX + pipe.width + pipeSpacing + pipe.width < 0) {
				this.removeFrontPipe();
			}

			pipe.update();
			pipe.render();
		}
	}
}

// Singular pipe objects
class Pipe {
	constructor(gapMin, gapMax, gapWidth) {
		this.locX = GameState.viewWidth;
		this.locY = 0;
		this.pipeGap1 = Math.random() * (gapMax - gapMin) + gapMin;
		this.pipeGap2 = this.pipeGap1 + gapWidth;
		this.width = pipeWidth;
	}

	// update position based on scroll speed
	update() {
		this.locX -= scrollSpeed;
	}

	// render pipe
	render() {
		fill("green");
		rect(this.locX, this.locY, this.width, this.pipeGap1);
		rect(
			this.locX,
			this.pipeGap2,
			this.width,
			GameState.viewHeight - this.pipeGap2
		);
	}
}
