class GameOverContainer extends PIXI.Container {
    constructor(score = 0) {
        super();

        this.menu = new PIXI.Container();
        this.addChild(this.menu);

        this.logo = new PIXI.Text("Game Over");
        this.logo.y = -100;
        this.logo.anchor.set(0.5);
        this.menu.addChild(this.logo);
        this.score = new PIXI.Text(`Score: ${score}`);
        this.score.y = 0;
        this.score.anchor.set(0.5);
        this.menu.addChild(this.score);

        setTimeout(() => {
            this.restartButton = new Button("Restart", "good");
            this.restartButton.y = 100;
            // this.restartButton.anchor.set(0.5);
            this.restartButton.on("pointerup", app.stage.startGame);
            // this.restartButton.alpha = 0.01;
            
            this.menu.addChild(this.restartButton);
            this.goMenuButton = new Button("Menu");
            this.goMenuButton.y = 200;
            // this.goMenuButton.anchor.set(0.5);
            this.goMenuButton.on("pointerup", app.stage.goMainMenu);
            // this.goMenuButton.alpha = 0.01;
            this.menu.addChild(this.goMenuButton);
        }, 800);
    }

    update(delta) {
        this.menu.x = app.screen.width / app.stage.scale.x / 2;
        this.menu.y = app.screen.height / app.stage.scale.y / 2;

        // if (this.restartButton.alpha != 0 && this.restartButton.alpha < 1)
        //     this.restartButton.alpha += delta * 0.1;

        // if (this.goMenuButton.alpha != 0 && this.goMenuButton.alpha < 1)
        //     this.goMenuButton.alpha += delta * 0.1;
    }

    destroy() {}
}
