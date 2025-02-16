let gapMin = 200;
let gapMax = 400;
let pipeWidth = 50;
let gapWidth = 100;
let pipeSpacing = 200;

class PipeFactory {
	constructor() {
		this.pipes = [];
	}

	createPipe() {
		let pipe = new Pipe(gapMin, gapMax, gapWidth);
		this.pipes.push(pipe);
	}

	removeFrontPipe() {
		this.pipes.splice(0, 1);
	}

	locationTouchesPipe(locX, locY, width, height) {
		if (this.pipes === undefined || !GameState.firstKeyPressed) return;

		for (let pipe of this.pipes) {
			if (locX + width >= pipe.locX && locX <= pipe.locX + pipe.width) {
				if (locY <= pipe.pipeGap1 || locY + height >= pipe.pipeGap2) {
					return true;
				}
			}
		}
		return false;
	}

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

class Pipe {
	constructor(gapMin, gapMax, gapWidth) {
		this.locX = GameState.viewWidth;
		this.locY = 0;
		this.pipeGap1 = Math.random() * (gapMax - gapMin) + gapMin;
		this.pipeGap2 = this.pipeGap1 + gapWidth;
		this.width = pipeWidth;
	}

	update() {
		this.locX -= 2;
	}

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
