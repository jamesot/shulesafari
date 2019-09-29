
window.onload = function() {
    setTimeout(function (){
        window.scrollTo(0,1);
    }, 10);
    game = new Phaser.Game(320 * resolution, 480 * resolution, Phaser.CANVAS);

    play =  game.state.add('play',WitchCrossward.Play,false);

    game.state.add('credits',WitchCrossward.Credits,false);

    //lv = game.state.add('levels',WitchCrossward.Levels,false);

    lv = game.state.add('levels',WitchCrossward.Map_Levels,false);

    game.state.add('menu',WitchCrossward.Menu,false);

    game.state.add('preload',WitchCrossward.Preload,false);

    game.state.add('boot',WitchCrossward.Boot,true);

};

