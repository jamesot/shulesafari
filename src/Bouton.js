var Bouton = function (game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame) {
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame);
    this.anchor.setTo(.5, .5);
    this.onInputDown.add(function () {
        if (this.key != 'bnt_show' && this.key != 'bnt_delete')
            //game.add.tween(this.scale).to({x: 1.2, y: .8}, 300, Phaser.Easing.Back.Out, true, 0).to({x: 1, y: 1}, 1e3, Phaser.Easing.Elastic.Out, true);
            this.scale.setTo(this.scale.x+0.2, this.scale.y+0.2);
        if (Music.enableMisic)Music.sounds.play('button');
        if (this.txt) {
            game.world.bringToTop(this.txt);
            this.txt.scale.setTo(1.2, 1.2);
            /*if (this.key != 'bnt_show' && this.key != 'bnt_delete')
                game.add.tween(this.txt.scale).to({x: 1.2, y: .8}, 300, Phaser.Easing.Back.Out, true, 0).to({x: 1, y: 1}, 1e3, Phaser.Easing.Elastic.Out, true)*/
        }
    }, this);
    this.onInputUp.add(function () {
        this.scale.setTo(this.scale.x-0.2,this.scale.y-0.2);
        if (this.txt) {
            game.world.bringToTop(this.txt);
            this.txt.scale.setTo(1, 1);
        }
    }, this);
    this.onInputOver.add(function () {
    }, this)
};
Bouton.prototype = Object.create(Phaser.Button.prototype);
Bouton.prototype.constructor = Bouton;