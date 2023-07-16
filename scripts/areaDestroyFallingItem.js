class AreaDestroyFallingItem extends FallingItem {
    constructor() {
        super();

        this.distance = 512;

        this.areaSprite = new PIXI.Sprite(new PIXI.Texture(bundles.misc.area));

        this.areaSprite.anchor.x = 0.5;
        this.areaSprite.anchor.y = 0.5;

        this.areaSprite.scale.set(this.distance / this.areaSprite.height * 2);

        this.addChild(this.areaSprite);
        this.interactiveChildren = false;
    }
}
