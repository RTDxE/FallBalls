class FullDestroyFallingItem extends FallingItem {
    constructor() {
        super();

        this.filters = [new PIXI.filters.OutlineFilter(5, 0xc800ff)];

        this.rotationSpeed = -0.2;
    }
}
