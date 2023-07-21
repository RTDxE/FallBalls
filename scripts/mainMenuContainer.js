class MainMenuContainer extends PIXI.Container {
    constructor() {
        super();

        const logoTexture = new PIXI.Texture(bundles.ui.logo);

        this.menu = new PIXI.Container();
        this.addChild(this.menu);

        this.logo = new PIXI.Sprite(logoTexture);
        this.logo.scale.set(0.5);
        this.logo.y = 0;
        this.logo.anchor.set(0.5);
        this.menu.addChild(this.logo);

        this.startButton = new Button(translate('button.start'));
        this.startButton.y = 200;
        this.startButton.on("pointerdown", app.stage.startGame);
        this.menu.addChild(this.startButton);
    }

    update(delta) { }

    resize() {
        this.menu.x = app.screen.width / app.stage.scale.x / 2;
        this.menu.y = app.screen.height / app.stage.scale.y / 2;
    }

    destroy() {}
}
