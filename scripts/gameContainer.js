class GameContainer extends PIXI.Container {
    constructor() {
        super();

        const scoreBgTexture = new PIXI.Texture(bundles.ui.scoreBg);

        this.items = [];
        for (let index = 0; index < 2; index++) {
            this.spawnNewItem();
        }

        this.timeout = null;
        this.startIntervalStep = 10;
        this.intervalSpawnItems(1000);

        this.score = 0;
        this.scoreBg = new PIXI.Sprite(scoreBgTexture);
        this.scoreBg.y = 0;
        this.addChild(this.scoreBg);
        this.scoreText = new PIXI.Text("Score: 0", fontStyle.default);
        this.scoreText.anchor.set(-0.25);
        this.scoreBg.addChild(this.scoreText);
    }

    spawnNewItem() {
        let item = null;
        if (getRandomArbitrary(0, 1) < 0.1) {
            item = new DoubleFallingItem();
        } else {
            item = new FallingItem();
        }
        this.addChild(item);
        this.items.push(item);
    }

    intervalSpawnItems(interval) {
        this.spawnNewItem();
        this.timeout = setTimeout(
            this.intervalSpawnItems.bind(this),
            interval,
            Math.max(interval - this.startIntervalStep, 50)
        );
        this.startIntervalStep -= this.startIntervalStep / 50;
    }

    update(delta) {
        this.items.forEach((item, index) => {
            item.update(delta);
            if (item.y > app.screen.height / app.stage.scale.y - 64) {
                app.stage.gameOver(item, this.score);
                return;
            } else if (item.clicked) {
                if (item instanceof DoubleFallingItem) {
                    item.createDouble().forEach((itemD) => {
                        this.addChild(itemD);
                        this.items.push(itemD);
                    });
                }
                this.items.splice(index, 1);
                this.removeChild(item);
                this.score += 1;
                this.scoreText.text = `Score: ${this.score}`;
            }
        });
    }

    destroy() {
        clearTimeout(this.timeout);
        this.items = [];
    }
}
