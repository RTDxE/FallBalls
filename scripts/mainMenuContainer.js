class MainMenuContainer extends PIXI.Container {
    constructor() {
        super();
        const textureButton = PIXI.Texture.from(
            "https://pixijs.com/assets/button.png"
        );
        const logoTexture = PIXI.Texture.from(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Example_title.svg/1280px-Example_title.svg.png"
        );

        this.menu = new PIXI.Container();
        this.addChild(this.menu);

        this.logo = new PIXI.Sprite(logoTexture);
        this.logo.scale.set(0.5);
        this.logo.y = 0;
        this.logo.anchor.set(0.5);
        this.menu.addChild(this.logo);

        this.startButton = new PIXI.Sprite(textureButton);
        this.startButton.eventMode = "dynamic";
        this.startButton.cursor = "pointer";
        this.startButton.y = 200;
        this.startButton.anchor.set(0.5);
        this.startButton.on("pointerup", () => {
            app.stage.startGame();
        });
        this.menu.addChild(this.startButton);
    }

    update(delta) {
        this.menu.x = app.screen.width / 2;
        this.menu.y = app.screen.height / 2 - this.menu.height / 3;

        // this.menu.pivot.x = this.menu.width / 2;
        // this.menu.pivot.y = this.menu.height / 2;
    }

    destroy() {}
}
