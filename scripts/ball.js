class Ball extends PIXI.Sprite {
    constructor() {
        super(
            PIXI.Texture.from(
                "https://img.icons8.com/?size=128&id=fkDdS2VvGx_2&format=png"
            )
        );

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.x = getRandomArbitrary(100, app.screen.width - 100);
        this.y = -200;

        this.doubler = getRandomArbitrary(0, 1) < 0.1;
        // console.log(this.doubler);

        this.fallSpeed = getRandomArbitrary(1, 4);
        if (this.doubler) {
            this.rotationSpeed = 0.1;
        } else {
            this.rotationSpeed = getRandomArbitrary(-0.01, 0.01);
        }

        this.interactive = true;
        this.clicked = false;
        this.pushVelocity = { x: 0, y: 0 };

        this.on("pointerdown", () => {
            this.clicked = true;
        });
    }

    createDouble() {
        let ball1 = new Ball();
        ball1.x = this.x - 32;
        ball1.y = this.y;
        ball1.doubler = false;
        ball1.rotationSpeed = getRandomArbitrary(-0.01, 0.01);
        ball1.pushVelocity.x = -getRandomArbitrary(1, 5);
        ball1.pushVelocity.y = -getRandomArbitrary(3, 10);

        let ball2 = new Ball();
        ball2.x = this.x + 32;
        ball2.y = this.y;
        ball2.doubler = false;
        ball2.rotationSpeed = getRandomArbitrary(-0.01, 0.01);
        ball2.pushVelocity.x = getRandomArbitrary(1, 5);
        ball2.pushVelocity.y = -getRandomArbitrary(3, 10);

        return [ball1, ball2];
    }

    update(delta) {
        this.x += this.pushVelocity.x * delta;
        this.y += this.fallSpeed * delta;
        this.y += this.pushVelocity.y * delta;
        this.pushVelocity.x -= this.pushVelocity.x * delta / 20;
        this.pushVelocity.y -= this.pushVelocity.y * delta / 20;
        // this.pushVelocity.y = Math.max(this.pushVelocity.y - (this.pushVelocity.y * delta / 10), 0);
        this.rotation += this.rotationSpeed * delta;
    }
}
