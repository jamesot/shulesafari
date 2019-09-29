WitchCrossward.Credits = function (game) {
    this.bnt_home = null
};
WitchCrossward.Credits.prototype = {
    create: function () {
        this.add.image(0, 0, "credits");
        this.bnt_home = new Bouton(this.game, game.width/2, 0, "sprites2", this.funcHome, this);
        this.bnt_home.frameName = "bnt_home" + resolution + ".png";
        this.world.add(this.bnt_home)
    },
    funcHome: function () {
        play.InitialiseFade("menu")
    },
    update: function () {
        if (this.bnt_home.y < 40 * resolution) {
            this.bnt_home.y += 5
        }
    }
};