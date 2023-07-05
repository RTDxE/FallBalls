class GameContainer extends PIXI.Container {
    constructor() {
        super();

        this.balls = [];
        for (let index = 0; index < 2; index++) {
            this.spawnNewBall();
        }

        this.timeout = null;
        this.startIntervalStep = 10;
        this.intervalSpawnBalls(1000);
    }

    spawnNewBall() {
        let ball = new Ball();
        this.addChild(ball);
        this.balls.push(ball);
    }

    intervalSpawnBalls(interval) {
        // console.log(interval);
        this.spawnNewBall();
        this.timeout = setTimeout(
            this.intervalSpawnBalls.bind(this),
            interval,
            Math.max(interval - this.startIntervalStep, 50)
        );
        this.startIntervalStep -= this.startIntervalStep / 50;
    }

    update(delta) {
        this.balls.forEach((ball, index) => {
            ball.update(delta);
            if (ball.y > app.screen.height - 64) {
                // this.balls.splice(index, 1);
                // this.removeChild(ball);
                app.stage.gameOver(ball);
                return;
            } else if (ball.clicked) {
                if (ball.doubler) {
                    ball.createDouble().forEach((ballD) => {
                        this.addChild(ballD);
                        this.balls.push(ballD);
                    });
                }
                this.balls.splice(index, 1);
                this.removeChild(ball);
            }
        });
    }

    destroy() {
        clearTimeout(this.timeout);
        this.balls = [];
    }
}
