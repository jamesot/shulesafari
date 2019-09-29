WitchCrossward.Menu = function (game) {
    this.musicbnt = null;
    this.bnt_play = null;
    this.bnt_credits = null;
    //this.bnt_moregames = null;
    this.logo = null;
    this.tween_play = null;
    this.state = null;

    this.witch_light = null;
    this.witch = null;
    this.emitter = null;
    this.emitter_witch = null;
};
WitchCrossward.Menu.prototype = {
    create: function () {

        this.add.image(0, 0, "bgMenu");

        game.time.events.add(1, (function(){
            this.emitter_witch = null;

            this.emitter = game.add.emitter(120*resolution,490*resolution, 500);
            this.emitter.makeParticles('light_snow');
            this.emitter.maxParticleScale = 1;
            this.emitter.minParticleScale = 0.3;
            this.emitter.setYSpeed(-20, -100);
            this.emitter.setXSpeed(40, -40);
            this.emitter.width = game.world.width ;
            this.emitter.gravity = 0;
            this.emitter.start(false, 10000,400);

            this.logo = game.add.sprite(game.width / 2, 0, "sprites2");
            this.logo.frameName = "logo" + resolution + ".png";
            this.logo.y += this.logo.height/2;
            this.logo.scale.setTo(0, 0);
            this.logo.anchor.setTo(.5, .5);

            //(game.add.tween(this.logo).to({angle: 360}, 1e3, Phaser.Easing.Quadratic.Out)).start();
            game.time.events.add(150, (function(){if (Music.enableMisic) Music.sounds.play("whoosh");}), this);
            ((game.add.tween(this.logo.scale).to({x: 1, y: 1}, 400, Phaser.Easing.Back.Out, false, 300)).start()).onComplete.add(function () {
                game.time.events.add(1050, (function(){
                    ((game.add.tween(this.logo.scale).to({x: 0.8, y: 1.15}, 500, Phaser.Easing.Back.Out, false, 3000).to({x: 1,y:1}, 400, Phaser.Easing.Elastic.Out)).loop()).start();
                }), this);
            }, this);

            this.bnt_play = new Bouton(this.game, game.width / 2, 410 * resolution, "sprites2", this.actionPlay, this);
            this.bnt_play.frameName = "playbtn" + resolution + ".png";
            this.bnt_play.scale.setTo(0,0);

            this.world.add(this.bnt_play);
            this.musicbnt = new Bouton(this.game, game.width - 25 * resolution, 20 * resolution, "sprites2", this.actionMusic, this);
            this.musicbnt.frameName = "musicbnt" + resolution + ".png";
            this.musicbnt.scale.setTo(0,0);
            this.world.add(this.musicbnt);

            this.bnt_credits = new Bouton(this.game, 25 * resolution, 20 * resolution, "sprites2", this.funccredits, this);
            this.bnt_credits.frameName = "creditsBnt" + resolution + ".png";
            this.bnt_credits.scale.setTo(0,0);
            this.world.add(this.bnt_credits);

            this.witch_light = game.add.sprite(game.width/2 - (12*resolution), 317*resolution, 'sprites2', 'witch_light'+resolution+'.png');
            this.witch_light.anchor.setTo(.5,.5);
            this.witch_light.scale.setTo(0,0);
            (game.add.tween(this.witch_light.scale).to({x: 1, y: 1}, 400, Phaser.Easing.Quadratic.InOut, false, 1400)).start();

            this.witch = game.add.sprite(215*resolution, 353*resolution, 'sprites2', 'witch_menu'+resolution+'.png');
            this.witch.anchor.setTo(.5,.5);
            this.witch.scale.setTo(0,0);

            game.time.events.add(1500, (function(){
                if (Music.enableMisic)Music.sounds.play('witch_menu');

                this.emitter_witch = game.add.emitter(game.width/2 + (50*resolution), (230*resolution) + this.witch.height/2, 15);
                //this.emitter_witch = game.add.emitter(this.witch.x + (20*resolution), this.witch.y + this.witch.height/2 - (15*resolution), 15);
                this.emitter_witch.makeParticles('etoile_particule');
                this.emitter_witch.setAlpha(1,0,1000,Phaser.Easing.Linear.None);
                this.emitter_witch.setScale(1,.5,1000,Phaser.Easing.Linear.None);
                this.emitter_witch.minParticleSpeed.setTo(-100, 0);
                this.emitter_witch.maxParticleSpeed.setTo(100, 100);
                this.emitter_witch.width = 100*resolution;
                this.emitter_witch.start(false, 1200, 15, 15);
            }), this);
            (game.add.tween(this.witch).to({x: 115*resolution, y: 333*resolution}, 400, Phaser.Easing.Quadratic.InOut, false, 1000).to({x: game.width/2 + (40*resolution), y: 220*resolution}, 400, Phaser.Easing.Quadratic.InOut)).start();
            ((game.add.tween(this.witch.scale).to({x: 1, y: 1}, 800, Phaser.Easing.Quadratic.InOut, false, 1000)).start()).onComplete.add((function(){
                //((game.add.tween(this.witch).to({y: this.witch.y + 10*resolution}, 1500, Phaser.Easing.Quadratic.InOut).to({y: this.witch.y}, 1500, Phaser.Easing.Quadratic.InOut)).loop()).start();
                //((game.add.tween(this.witch_light).to({y: this.witch_light.y + 10*resolution}, 1500, Phaser.Easing.Quadratic.InOut).to({y: this.witch_light.y}, 1500, Phaser.Easing.Quadratic.InOut)).loop()).start();



                ((game.add.tween(this.bnt_play.scale).to({x: 1, y: 1}, 400, Phaser.Easing.Back.Out, false, 0)).start()).onComplete.add((function(){
                    ((game.add.tween(this.witch).to({y: this.witch.y + 10*resolution}, 1500, Phaser.Easing.Quadratic.InOut).to({y: this.witch.y}, 1500, Phaser.Easing.Quadratic.InOut)).loop()).start();

                    this.tween_play = game.add.tween(this.bnt_play.scale).to({x: .85, y: .85}, 1500, Phaser.Easing.Quadratic.Out).to({x: 1, y: 1}, 1500, Phaser.Easing.Quadratic.Out);
                    this.tween_play.start();
                    this.tween_play.loop();
                }), this);
                (game.add.tween(this.musicbnt.scale).to({x: 1, y: 1}, 400, Phaser.Easing.Back.Out, false, 200)).start();
                (game.add.tween(this.bnt_credits.scale).to({x: 1, y: 1}, 400, Phaser.Easing.Back.Out, false, 400)).start();
            }), this);

            if (Music.enableMisic) {
                this.musicbnt.frameName = "musicbnt" + resolution + ".png"
            } else {
                this.musicbnt.frameName = "Mutemusicbnt" + resolution + ".png"
            }

        }), this);
    },
    actionMusic: function () {
        Music.enableMisic = !Music.enableMisic;
        if (Music.enableMisic) {
            this.musicbnt.frameName = "musicbnt" + resolution + ".png";
            Music.music.resume()
        } else {
            this.musicbnt.frameName = "Mutemusicbnt" + resolution + ".png";
            Music.music.pause()
        }
    },
    actionPlay: function () {
        play.InitialiseFade("levels")
    },
    funccredits: function () {
        play.InitialiseFade("credits")
    },
    update: function(){
        /*if (this.emitter_witch && this.witch){
            this.emitter_witch.x = this.witch.x;
            this.emitter_witch.y = this.witch.y;
        }*/
    }
};