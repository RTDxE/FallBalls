class GameContainer extends PIXI.Container {
    constructor() {
        super();

        const scoreBgTexture = new PIXI.Texture(bundles.ui.scoreBg);

        this.items = [];
        for (let index = 0; index < 2; index++) {
            this.spawnNewItem();
        }

        this.startIntervalStep = 10;
        this.currentSpawnInterval = 1000;
        this.spawnTime = 0;

        this.score = 0;
        this.scoreBg = new PIXI.Sprite(scoreBgTexture);
        this.scoreBg.x = 8;
        this.scoreBg.y = 8;
        this.addChild(this.scoreBg);
        this.scoreText = new PIXI.Text("Score: 0", fontStyle.default);
        this.scoreText.anchor.set(0.5);
        this.scoreText.x = this.scoreBg.width / 2
        this.scoreText.y = this.scoreBg.height / 2
        this.scoreBg.addChild(this.scoreText);
    }

    spawnNewItem() {
        let item = null;
        if (getRandomArbitrary(0, 1) < 0.1) {
            let itemVariant = getRandomArbitrary(0, 1);
            if (itemVariant < 0.1) {
                item = new AreaDestroyFallingItem();
            } else if (itemVariant < 0.2) {
                item = new FullDestroyFallingItem();
            } else {
                item = new DoubleFallingItem();
            }
        } else {
            item = new FallingItem();
        }
        this.addChild(item);
        this.items.push(item);
    }

    checkSpawnNewItem(delta) {
        this.spawnTime += delta;
        if (this.spawnTime < this.currentSpawnInterval) return;
        this.spawnNewItem();
        this.spawnTime = 0;
        this.currentSpawnInterval = Math.max(
            this.currentSpawnInterval - this.startIntervalStep,
            50
        );
        this.startIntervalStep -= this.startIntervalStep / 50;
    }

    update(delta) {
        this.checkSpawnNewItem((delta / 60) * 1000);

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
                } else if (item instanceof AreaDestroyFallingItem) {
                    this.items.forEach((itemD) => {
                        if (
                            distance(item.x, item.y, itemD.x, itemD.y) <=
                            item.distance
                        ) {
                            itemD.clicked = true;
                        }
                    });
                } else if (item instanceof FullDestroyFallingItem) {
                    this.items.forEach((itemD) => {
                        if (itemD.y > -32) {
                            itemD.clicked = true;
                        }
                    });
                }
                this.items.splice(index, 1);
                this.removeChild(item);
                this.score += 1;
                this.scoreText.text = `Score: ${this.score}`;
            }
        });
    }

    resize() {}

    destroy() {
        this.items = [];
    }
}
