let veloStep = 0.34;

class Bird {
	constructor(locX, locY, width, height) {
		this.locX = locX;
		this.locY = locY;
		this.height = height;
		this.width = width;
		this.velocity = 0;
	}

	move(locY) {
		this.locY = locY;
	}

	outOfBoundsTop() {
		return this.locY < 0;
	}

	outOfBoundsBottom() {
		return this.locY > GameState.viewHeight - this.height;
	}

	checkBounds() {
		if (this.outOfBoundsTop()) {
			this.velocity = 0;
			this.move(0);
		}

		if (this.outOfBoundsBottom()) {
			this.velocity = 0;
			this.move(GameState.viewHeight - this.height);
		}
	}

	flap() {
		this.velocity += veloStep * 1.5;
		this.move(this.locY - floor(this.velocity));

		this.checkBounds();
	}

	notFlapping() {
		this.velocity -= veloStep;
		this.move(this.locY - floor(this.velocity));

		this.checkBounds();
	}

	update() {
		if (keyIsDown(32)) {
			GameState.firstKeyPressed = true;
			this.flap();
		} else if (GameState.firstKeyPressed) {
			this.notFlapping();
		}
	}

	render() {
		this.update();

		console.log("Drawing bird at " + this.locX + ", " + this.locY);
		fill("white");
		rect(this.locX, this.locY, this.width, this.height);
	}
}
