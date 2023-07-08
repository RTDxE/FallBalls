class Button extends PIXI.Container {
    constructor(text = "Button", type = "default") {
        super();

        const textureButtonYellow = new PIXI.Texture(bundles.ui.buttonYellow);
        const textureButtonBlue = new PIXI.Texture(bundles.ui.buttonBlue);
        const textureButtonGreen = new PIXI.Texture(bundles.ui.buttonGreen);
        const textureButtonRed = new PIXI.Texture(bundles.ui.buttonRed);
        switch (type) {
            case "shop":
                this.background = new PIXI.Sprite(textureButtonBlue);
                break;
            case "good":
                this.background = new PIXI.Sprite(textureButtonGreen);
                break;
            case "bad":
                this.background = new PIXI.Sprite(textureButtonRed);
                break;
            default:
                this.background = new PIXI.Sprite(textureButtonYellow);
                break;
        }
        this.background.eventMode = "dynamic";
        this.background.cursor = "pointer";
        this.background.anchor.set(0.5);
        this.background.on("pointerup", (event) =>
            this.emit("pointerup", event)
        );
        this.addChild(this.background);

        this.text = new PIXI.Text(text);
        this.addChild(this.text);
        this.text.anchor.set(0.5);

        // this.alpha = new PIXI.filters.AlphaFilter(1);
        // this.filters = [this.alpha];
    }
}
