const app = new PIXI.Application({
    background: "#ddd",
    resizeTo: window,
});
document.body.appendChild(app.view);

let state = new GameOverContainer();
app.stage.addChild(state);

let failItem = null;

app.ticker.add((delta) => {
    state.update(delta);
    if (failItem != null) {
        failItem.alpha -= delta * 0.05;
        failItem.scale.x -= 0.05 * delta;
        failItem.scale.y -= 0.05 * delta;
        if (failItem.alpha > 0.5) {
            failItem.y -= (failItem.alpha * failItem.alpha - 0.25) * 20 * delta;
        } else {
            failItem.y += (0.5 - failItem.alpha * failItem.alpha) * 20 * delta;
        }
        if (failItem.alpha <= 0) failItem = null;
    }
});

app.stage.goMainMenu = function () {
    app.stage.removeChild(state);
    state = new MainMenuContainer();
    app.stage.addChild(state);
};

app.stage.startGame = function () {
    app.stage.removeChild(state);
    state = new GameContainer();
    app.stage.addChild(state);
};

app.stage.gameOver = function (item) {
    app.stage.removeChild(state);
    state.destroy()
    state = new GameOverContainer();
    app.stage.addChild(state);

    app.stage.addChild(item);

    setTimeout(() => {
        failItem = item;
    }, 1000);
};
