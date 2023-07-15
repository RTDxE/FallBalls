class FallingItem extends PIXI.Sprite {
    constructor() {
        super(
            new PIXI.Texture(
                bundles.items[activeBundle.items][
                    ["item1", "item2", "item3", "item4"].random()
                ]
            )
        );

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.x = getRandomArbitrary(
            64,
            app.screen.width / app.stage.scale.x - 64
        );
        this.y = -200;

        this.doubler = getRandomArbitrary(0, 1) < 0.1;
        // console.log(this.doubler);
        this.fallSpeed = getRandomArbitrary(2, 8);
        if (this.doubler) {
            this.rotationSpeed = 0.1;
        } else {
            this.rotationSpeed = getRandomArbitrary(-0.01, 0.01);
        }
        this.rotation = getRandomArbitrary(-2, 2);
        this.scale.set(0.7 + ((this.fallSpeed - 2) / 6) * 0.3);

        this.interactive = true;
        this.clicked = false;
        this.pushVelocity = { x: 0, y: 0 };

        this.on("pointerdown", () => {
            this.clicked = true;
        });
        this.on("pointerover", () => currentObj.setObj(this)).on(
            "pointerout",
            () => currentObj.delObj(this)
        );
    }

    createDouble() {
        let ball1 = new FallingItem();
        ball1.x = this.x - 32;
        ball1.y = this.y;
        ball1.doubler = false;
        ball1.rotationSpeed = getRandomArbitrary(-0.01, 0.01);
        ball1.pushVelocity.x = -ball1.fallSpeed;
        ball1.pushVelocity.y = -ball1.fallSpeed * 3;

        let ball2 = new FallingItem();
        ball2.x = this.x + 32;
        ball2.y = this.y;
        ball2.doubler = false;
        ball2.rotationSpeed = getRandomArbitrary(-0.01, 0.01);
        ball2.pushVelocity.x = ball2.fallSpeed;
        ball2.pushVelocity.y = -ball2.fallSpeed * 3;

        return [ball1, ball2];
    }

    update(delta) {
        this.x += this.pushVelocity.x * delta;
        this.x = Math.min(
            Math.max(this.x, 64),
            app.screen.width / app.stage.scale.x - 100
        );
        this.y += this.fallSpeed * delta;
        this.y += this.pushVelocity.y * delta;
        this.pushVelocity.x -= (this.pushVelocity.x * delta) / 20;
        this.pushVelocity.y -= (this.pushVelocity.y * delta) / 20;
        // this.pushVelocity.y = Math.max(this.pushVelocity.y - (this.pushVelocity.y * delta / 10), 0);
        this.rotation += this.rotationSpeed * delta;
    }
}
