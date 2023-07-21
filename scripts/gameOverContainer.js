class GameOverContainer extends PIXI.Container {
    constructor(score = 0) {
        super();

        bridge.advertisement.showInterstitial();

        let authorizationOptions = {
            yandex: {
                scopes: true,
            },
        };

        bridge.player.authorize(authorizationOptions).finally(() => {
            bridge.storage
                .get("arcadeRecord")
                .then((data) => {
                    if (data != null) storageData.arcadeRecord = parseInt(data);
                    else storageData.arcadeRecord = 0;
                })
                .finally(() => {
                    this.newRecord = storageData.arcadeRecord < score;

                    if (this.newRecord) {
                        storageData.arcadeRecord = score;
                        bridge.storage.set("arcadeRecord", score.toString());

                        if (bridge.player.isAuthorized) {
                            if (
                                bridge.leaderboard.isSupported &&
                                this.newRecord
                            ) {
                                let setScoreOptions = {
                                    yandex: {
                                        leaderboardName: "ArcadeMode",
                                        score: score,
                                    },
                                };
                                bridge.leaderboard.setScore(setScoreOptions);
                            }
                        }
                    }
                });
        });

        const popupTexture = new PIXI.Texture(bundles.ui.popup);

        this.menu = new PIXI.Container();
        this.addChild(this.menu);

        this.popup = new PIXI.Sprite(popupTexture);
        this.popup.y = 50;
        this.popup.anchor.set(0.5);
        this.menu.addChild(this.popup);

        this.logo = new PIXI.Text(translate('title.gameOver'), fontStyle.title);
        this.logo.y = -120;
        this.logo.anchor.set(0.5);
        this.menu.addChild(this.logo);

        this.recordScore = new PIXI.Text(
            translate('label.record', {count : storageData.arcadeRecord}),
            fontStyle.sub
        );
        this.recordScore.y = 20;
        this.recordScore.anchor.set(0.5);
        this.menu.addChild(this.recordScore);

        this.score = new PIXI.Text(translate('label.score', {count : score}), fontStyle.sub);
        this.score.y = 100;
        this.score.anchor.set(0.5);
        this.menu.addChild(this.score);

        if (this.newRecord) {
            this.newRecordText = new PIXI.Text(translate('label.newRecord'), fontStyle.record);
            this.newRecordText.y = -50;
            this.newRecordText.anchor.set(0.5);
            this.menu.addChild(this.newRecordText);
        }

        this.restartButton = new Button(translate('button.restart'), "good");
        this.restartButton.y = 210;
        this.restartButton.x = 150;
        this.restartButton.on("pointerdown", () => {
            if (
                bridge.advertisement.interstitialState != "loading" ||
                bridge.advertisement.interstitialState != "opened"
            ) {
                app.stage.startGame();
            }
        });
        this.menu.addChild(this.restartButton);

        this.goMenuButton = new Button(translate('button.menu'));
        this.goMenuButton.y = 210;
        this.goMenuButton.x = -150;
        this.goMenuButton.on("pointerdown", () => {
            if (
                bridge.advertisement.interstitialState != "loading" ||
                bridge.advertisement.interstitialState != "opened"
            ) {
                app.stage.goMainMenu();
            }
        });
        this.menu.addChild(this.goMenuButton);
    }

    update(delta) {}

    resize() {
        this.menu.x = app.screen.width / app.stage.scale.x / 2;
        this.menu.y = app.screen.height / app.stage.scale.y / 2;
    }

    destroy() {}
}
