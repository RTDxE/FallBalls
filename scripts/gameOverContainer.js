class GameOverContainer extends PIXI.Container {
    constructor() {
        super();
        const textureButton = PIXI.Texture.from(
            "https://pixijs.com/assets/button.png"
        );

        this.menu = new PIXI.Container();
        this.addChild(this.menu);

        this.logo = new PIXI.Text("Game Over");
        this.logo.y = 0;
        this.logo.anchor.set(0.5);
        this.menu.addChild(this.logo);

        this.restartButton = new PIXI.Sprite(textureButton);
        this.restartButton.y = 100;
        this.restartButton.anchor.set(0.5);
        this.restartButton.alpha = 0;
        this.menu.addChild(this.restartButton);

        this.goMenuButton = new PIXI.Sprite(textureButton);
        this.goMenuButton.y = 200;
        this.goMenuButton.anchor.set(0.5);
        this.goMenuButton.alpha = 0;
        this.menu.addChild(this.goMenuButton);

        setTimeout(() => {
            this.restartButton.eventMode = "dynamic";
            this.restartButton.cursor = "pointer";
            this.restartButton.alpha = 0.01;
            this.restartButton.on("pointerup", () => {
                app.stage.startGame();
            });

            this.goMenuButton.eventMode = "dynamic";
            this.goMenuButton.cursor = "pointer";
            this.goMenuButton.alpha = 0.01;
            this.goMenuButton.on("pointerup", () => {
                app.stage.goMainMenu();
            });
        }, 2000);
    }

    update(delta) {
        this.menu.x = app.screen.width / 2;
        this.menu.y = app.screen.height / 2 - this.menu.height / 3;

        if (this.restartButton.alpha != 0 && this.restartButton.alpha < 1)
            this.restartButton.alpha += delta * 0.1;
        
        this.goMenuButton.alpha = this.restartButton.alpha
        // this.menu.pivot.x = this.menu.width / 2;
        // this.menu.pivot.y = this.menu.height / 2;
    }

    destroy() {}
}
