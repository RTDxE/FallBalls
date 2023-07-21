class DoubleFallingItem extends FallingItem {
    constructor() {
        super();

        this.rotationSpeed = 0.1;

        this.filters = [new PIXI.filters.OutlineFilter(5, 0xff4d00)];
    }

    createDouble() {
        let ball1 = new FallingItem();
        ball1.x = this.x - 32;
        ball1.y = this.y;
        ball1.doubler = false;
        ball1.rotationSpeed = getRandomArbitrary(-0.01, 0.01);
        ball1.pushVelocity.x = -ball1.fallSpeed;
        ball1.pushVelocity.y = -ball1.fallSpeed * 3;

        let ball2 = new FallingItem();
        ball2.x = this.x + 32;
        ball2.y = this.y;
        ball2.doubler = false;
        ball2.rotationSpeed = getRandomArbitrary(-0.01, 0.01);
        ball2.pushVelocity.x = ball2.fallSpeed;
        ball2.pushVelocity.y = -ball2.fallSpeed * 3;

        return [ball1, ball2];
    }
}
