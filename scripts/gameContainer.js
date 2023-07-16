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
        this.scoreBg.y = 0;
        this.addChild(this.scoreBg);
        this.scoreText = new PIXI.Text("Score: 0", fontStyle.default);
        this.scoreText.anchor.set(-0.25);
        this.scoreBg.addChild(this.scoreText);
    }

    spawnNewItem() {
        let item = new FallingItem();
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
                if (item.doubler) {
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
        this.items = [];
    }
}
