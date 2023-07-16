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

        this.fallSpeed = getRandomArbitrary(2, 8);
        this.rotationSpeed = getRandomArbitrary(-0.01, 0.01);
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
        this.rotation += this.rotationSpeed * delta;
    }
}
