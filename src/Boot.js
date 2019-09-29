WitchCrossward = {};
WitchCrossward.Boot = function (game) {
};
WitchCrossward.Boot.prototype = {
    preload: function () {
        this.game.load.image("preloadSprite01", "assets/preloadBar" + resolution + ".png");
        game.load.image("bgPreload", "assets/bgPreload" + resolution + ".png");
        game.load.image("bgMenu", "assets/bgMenu" + resolution + ".png");
        game.load.atlasXML("sprites2", "assets/sprites.png", "assets/sprites.xml");
        //game.load.atlasJSONHash("sprites", "assets/sprites2.png", "assets/sprites2.txt");
    },

    create: function () {
        this.input.maxPointers = 1;
        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.forceOrientation(false, true, "rotate");
        }
        this.game.scale.enterPortrait.add(this.rescale, this);
        this.game.scale.enterLandscape.add(this.rescale, this);
        this.game.onResume.add(this.rescale, this);

        this.scale.setScreenSize(true);

        this.game.state.start("preload")
    },

    rescale: function () {
        var _game = this.game;
        setTimeout(function () {
            _game.scale.refresh();
            setTimeout(function () {
                _game.scale.refresh()
            }, 400)
        }, 400)
    }
};