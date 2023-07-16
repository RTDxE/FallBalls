const app = new PIXI.Application({
    background: "#ddd",
    width: window.innerWidth,
    height: 1000,
});

const appContainer = document.getElementById("app-container");
appContainer.appendChild(app.view);

app.renderer.events.cursorStyles.default =
    "url('./assets/ui/default/cursor.png') 32 32,auto";
app.renderer.events.cursorStyles.pointer =
    "url('./assets/ui/default/cursorPointer.png') 32 32,pointer";

bundles = { background: null, ui: null, items: [] };
activeBundle = { background: "default", items: 0 };
async function loadBundles() {
    await PIXI.Assets.init({ manifest: "./assets/manifest.json" });
    PIXI.Assets.backgroundLoadBundle(["background", "ui", "defaultItems", "fonts"]);
    bundles.background = await PIXI.Assets.loadBundle("background");
    bundles.ui = await PIXI.Assets.loadBundle("ui");
    bundles.items.push(await PIXI.Assets.loadBundle("defaultItems"));
    bundles.fonts = await PIXI.Assets.loadBundle("fonts");
    console.log(bundles.fonts);
}
let state = null;
loadBundles().then(() => {
    this.background = PIXI.Sprite.from(
        bundles.background[activeBundle.background]
    );
    this.background.anchor.set(0.5);
    app.stage.addChild(this.background);

    const blurFilter1 = new PIXI.filters.BlurFilter();
    blurFilter1.blur = 10;
    this.background.filters = [blurFilter1];

    state = new MainMenuContainer();
    app.stage.addChild(state);
    resize();
});

// Добавление события на нажатие клавиши
document.addEventListener("keydown", onKeyDown);

function onKeyDown(event) {
    if (event.repeat) return;
    if (event.code == "KeyZ" || event.code == "KeyX") {
        if (currentObj.currentObject != null) {
            console.log("asas");
            currentObj.currentObject.emit("pointerdown");
        }
    }
}

let currentObj = {
    currentObject: null,
    setObj: function (object) {
        if (object == this.currentObject) return;
        this.currentObject = object;
    },
    delObj: function (object) {
        if (this.currentObject != object) {
            return;
        }
        this.currentObject = null;
    },
};

let failItem = null;

app.ticker.add((delta) => {
    if (state == null) return;
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
    currentObj.currentObject = null;

    state = new MainMenuContainer();
    setTimeout(() => {
        app.stage.addChild(state);
    }, 1);
};

app.stage.startGame = function () {
    app.stage.removeChild(state);
    currentObj.currentObject = null;

    state = new GameContainer();
    app.stage.addChild(state);
};

app.stage.gameOver = function (item, score) {
    app.stage.removeChild(state);
    state.destroy();
    currentObj.currentObject = null;
    
    state = new GameOverContainer(score);
    setTimeout(() => {
        app.stage.addChild(state);

        app.stage.addChild(item);
    }, 1);
    setTimeout(() => {
        failItem = item;
    }, 1000);
};

function resize() {
    const windowHeight = window.innerHeight;
    const scale = windowHeight / 1000; // Масштабирование в зависимости от высоты окна браузера
    app.renderer.resize(window.innerWidth, windowHeight);
    app.stage.scale.set(scale, scale);

    if (this.background == null) return;

    let h = this.background.height;
    let w = this.background.width;
    if (
        app.screen.height / app.screen.width >
        this.background.texture.frame.height /
            this.background.texture.frame.width
    ) {
        this.background.height = app.screen.height / app.stage.scale.y;
        this.background.width *= this.background.height / h;
    } else {
        this.background.width = app.screen.width / app.stage.scale.y;
        this.background.height *= this.background.width / w;
    }

    this.background.x = app.screen.width / app.stage.scale.x / 2;
    this.background.y = app.screen.height / app.stage.scale.y / 2;
}

// Вызовите функцию изменения размера приложения при загрузке страницы и изменении размеров окна браузера
window.addEventListener("DOMContentLoaded", resize);
window.addEventListener("resize", resize);
