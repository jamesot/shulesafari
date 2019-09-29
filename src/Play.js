WitchCrossward.Play = function (game) {
    this.numLevel = null;
    this.gameOver = false;
    this.next_level = null;
    this.bnt_pause = null;
    this.bnt_replay = null;
    this.bgPause = null;
    this.start = null;
    this.groupPause = null;
    this.groupNexLevel = null;
    this.textPause = null;
    this.textPauseLevel = null;
    this.textPauseScore = null;
    this.textPauseTarget = null;
    this.etoilEnd1 = null;
    this.etoilEnd2 = null;
    this.etoilEnd3 = null;
    this.timerEndLevel = null;
    this.timerEndLevelAndLose = null;
    this.istimerEndLevel = null;
    this.istimerEndLevelAndLose = null;
    this.isEndAllLevels = null;
    this.stateMusic = null;
    this.bgnoire = null;
    this.you_win = null;
    this.txt_level = null;
    this.minutes = null;
    this.secondss = null;
    this.bonus_time = null;
    this.current_score = null;
    this.txt_score = null;
    this.number_etoiles = null;
    this.txt_score_win = null;
    this.map = null;
    this.layer = null;
    this.txt_time = null;
    this.objectives_finished = null;
    this.objectif_etoile = null;

    this.vect_words = null;
    this.mat_grid = null;

    this.rows = null;
    this.cols = null;

    this.score_mat = null;
    this.best_mat = null;
    this.mat_player = null;

    this.taille = null;
    this.all_words = null;

    this.mat_sprites = null;

    this.left_bound = null;
    this.right_bound = null;
    this.top_bound = null;
    this.bottom_bound = null;

    this.groupCells = null;
    this.groupMenuWord = null;
    this.bg_category = null;
    this.bg_question = null;
    this.txt_question = null;
    this.img_question = null;
    this.txt_category = null;
    this.bnt_exit = null;
    this.bnt_show = null;
    this.bnt_delete= null;
    this.nbr_hints= null;
    this.txt_nbr_hints= null;

    this.cell_selected = null;
    this.info_selected = null;
    this.debut_swip = null;
    this.time_debut_swip = null;
    this.vect_cell_response = null;
    this.vect_cell_letters = null;
    this.nbr_letters_response = null;

    this.nbr_letters_found = null;
    this.nbr_letters_level = null;

    this.star1 = null;
    this.star2 = null;
    this.star3 = null;

    this.witch_girl = null;
    this.hand = null;

    this.group_unlock = null;
    this.bg_unlock = null;
    this.txt_unlock = null;
    this.bnt_next = null;
    this.bnt_continue = null;

    this.snd_remove = null;

    this.container_notification = null;
    this.loading_level = null;

    this.group_hud = null;

};
WitchCrossward.Play.prototype = {
    create: function () {
        this.container_notification = game.add.sprite(0, 0, 'bgPlay');
        if (this.numLevel > nombre_levels) {
            this.createCongratulations();
            this.gameOver = true;
            return
        }
        this.loading_level = game.add.text(0, 200 * resolution, text.txtLoadingLevel, {font: 25 * resolution + langFont2, align: "center", fill: "#ffffff", stroke: "#000000", strokeThickness: 3 * resolution});
        this.loading_level.x = game.width/2 - this.loading_level.width/2;
        game.time.events.add(1000, (function(){
            try {
                load_matrice(play.numLevel-1);

                if (matrice[0][1] === undefined || (play.numLevel == 1 && matrice[6][8] == '')){
                    this.GenerateLevels(play.numLevel-1);
                    load_matrice(play.numLevel-1);
                }

                if (play.loading_level != null) play.loading_level.destroy();
                if (play.container_notification != null) play.container_notification.destroy();
            } catch (error) {
                //console.log(error);
                if (matrice[0][1] === undefined || (play.numLevel == 1 && matrice[6][8] == '')){
                    this.GenerateLevels(play.numLevel-1);
                    load_matrice(play.numLevel-1);
                }

                if (play.loading_level != null) play.loading_level.destroy();
                if (play.container_notification != null) play.container_notification.destroy();
            }

            this.initAtributs();
            nbr_hints = +Save_getItem("WitchCrossward_hints", 1);

            game.add.image(0, 0, "bgPlay");


            this.number_etoiles = sauvegarde[play.numLevel-1].numetoile;

            this.createButtonsPlay();

            new_level = false;

            this.nbr_letters_response = 0;
            this.nbr_letters_found = 0;
            this.nbr_letters_level = 0;
            this.vect_cell_response = [];
            this.vect_cell_letters = [];
            this.debut_swip = {};
            this.time_debut_swip = null;
            this.info_selected = {word: '', category: '', question: '', choices: '', visible_letters: '', ind: -1};
            //this.current_score = 0;
            this.nbr_hints= nbr_hints;
            this.snd_remove = 0;

            //this.txt_nbr_hints = game.add.bitmapText(0, 0, "fontc", text.txtHint+this.nbr_hints, 22 * resolution);
            this.txt_nbr_hints = game.add.text(0, 15*resolution, text.txtHint+this.nbr_hints, {font: (18 * resolution) + langFont2, align: 'center', fill: "#ffffff", stroke: "#975e2b", strokeThickness: 2 * resolution});
            //this.txt_nbr_hints.updateText();
            this.txt_nbr_hints.x = 263*resolution - this.txt_nbr_hints.width/2;

            /*this.txt_score = game.add.bitmapText(0, 5*resolution, "font", "" + this.current_score, 22 * resolution);
             this.txt_score.updateText();
             this.txt_score.x = game.width / 2 - this.txt_score.textWidth / 2 + (3*resolution);*/

            //this.txt_level = game.add.bitmapText(0, 0, "fontc", text.txtlevel + this.numLevel, 22 * resolution);
            this.txt_level = game.add.text(0, 9*resolution, text.txtlevel + this.numLevel, {font: (18 * resolution) + langFont2, align: 'center', fill: "#ffffff", stroke: "#975e2b", strokeThickness: 2 * resolution});
            //this.txt_level.updateText();
            this.txt_level.x = game.width/2 - this.txt_level.width / 2 + (10*resolution);

            if (sauvegarde[play.numLevel - 1].time == -1){
                this.minutes = Math.floor(timeLevel[play.numLevel-1]/60);
                this.secondss = timeLevel[play.numLevel-1]%60;
            }else{
                this.minutes = Math.floor(sauvegarde[play.numLevel - 1].time/60);
                this.secondss = sauvegarde[play.numLevel - 1].time%60;
            }
            this.bonus_time = this.minutes * 60 + this.secondss;
            this.bonus_timer = 1e3;

            //this.txt_time = game.add.bitmapText(70 * resolution, 0, "fontc", this.minutes + ":0" + this.secondss, 22 * resolution);
            this.txt_time = game.add.text(68*resolution, 15*resolution, this.minutes + ":0" + this.secondss, {font: (18 * resolution) + langFont2, align: 'center', fill: "#ffffff", stroke: "#975e2b", strokeThickness: 2 * resolution});
            if (this.secondss >= 10){
                this.txt_time.setText(this.minutes + ':' + this.secondss);
            }

            this.star1 = game.add.sprite(150*resolution, 32*resolution, 'star_off');
            this.star1.x = game.width/2 + (10*resolution) - this.star1.width / 2 - (26*resolution);
            if (this.number_etoiles >= 1) this.star1.loadTexture('star_on');
            this.star2 = game.add.sprite(150*resolution, 32*resolution, 'star_off');
            this.star2.x = game.width/2 + (10*resolution) - this.star2.width / 2;
            if (this.number_etoiles >= 2) this.star2.loadTexture('star_on');
            this.star3 = game.add.sprite(150*resolution, 32*resolution, 'star_off');
            this.star3.x = game.width/2 + (10*resolution) - this.star2.width / 2 + (26*resolution);
            if (this.number_etoiles >= 3) this.star3.loadTexture('star_on');

            this.group_hud.add(this.star1);
            this.group_hud.add(this.star2);
            this.group_hud.add(this.star3);
            this.group_hud.add(this.txt_nbr_hints);
            this.group_hud.add(this.txt_level);
            this.group_hud.add(this.txt_time);

            this.cell_selected = null;

            this.taille = 20*resolution;
            this.rows = 20;
            this.cols = 20;

            this.left_bound = game.width;
            this.right_bound = 0;
            this.top_bound = game.height;
            this.bottom_bound = 0;

            /*this.all_words = words;
             this.best_mat = {mat: [], score:-1};
             this.score_mat = 0;

             this.choose_words();

             console.log(this.vect_words);
             var nbr_iter = 0;
             while (nbr_iter < 200){
             this.algo_generation();
             nbr_iter++;
             }
             console.log('/// BEST MATRICE /// == ' + this.best_mat.score);*/
            //console.table(this.best_mat.mat);

            //console.table(matrice);
            this.best_mat = matrice;
            this.mat_player = matrice_player;

            this.groupCells = game.add.group();
            this.scale_moins = -0.2;
            this.create_grid();
            play.groupCells.x = -game.width*2;
            (game.add.tween(play.groupCells).to({x: 0}, 300, Phaser.Easing.Quadratic.Out, false, 700)).start();

            this.group_hud.y = -game.height;
            (game.add.tween(play.group_hud).to({y: 0}, 300, Phaser.Easing.Quadratic.Out, false, 500)).start();

            game.input.onUp.add(this.deplacer, this);


            this.createMenuWord();

            this.witch_girl = game.add.sprite(game.width + 270*resolution, 422*resolution, 'witch_happy');
            //this.witch_girl.scale.setTo(.75,.75);
            this.witch_girl.anchor.setTo(.5,.5);
            // (this.witch_girl.animations.add('happy', [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29])).onComplete.add((function(){
            (this.witch_girl.animations.add('happy', [0])).onComplete.add((function(){
                // (this.witch_girl.animations.play('happy', 40, false, false)).onComplete.add((function(){
                    // this.witch_girl.animations.play('idle', 33, true, false);
                // }), this);
            }), this);

            this.witch_girl.loadTexture('witch_sad');
            // (this.witch_girl.animations.add('sad', [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29])).onComplete.add((function(){
            (this.witch_girl.animations.add('sad', [0])).onComplete.add((function(){
                // this.witch_girl.animations.play('idle', 33, true, false);
                // (this.witch_girl.animations.play('sad', 40, false, false)).onComplete.add((function(){
                    // this.witch_girl.animations.play('idle', 33, true, false);
                // }), this);
            }), this);


            this.witch_girl.loadTexture('witch_idle');
            // this.witch_girl.animations.add('idle', [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29]);
            this.witch_girl.animations.add('idle', [0]);
            // this.witch_girl.animations.play('idle', 33, true, false);

            /*game.time.events.loop(5000, (function(){
             this.witch_girl.animations.play('normal', 33, false, false);
             }), this);*/

            /*this.witch_girl.frame = 0;
             this.witch_girl.tw_idle = game.add.tween(this.witch_girl).to({y: this.witch_girl.y - 10*resolution}, 1500, Phaser.Easing.Quadratic.InOut).to({y: this.witch_girl.y}, 1500, Phaser.Easing.Quadratic.InOut);
             this.witch_girl.tw_idle.loop();
             this.witch_girl.tw_idle.start();
             game.time.events.loop(6000, (function(){
             this.witch_girl.tw_idle.pendingDelete = true;
             (this.witch_girl.animations.play('idle', 33, false, false)).onComplete.add((function(){
             this.witch_girl.frame = 0;
             this.witch_girl.tw_idle = game.add.tween(this.witch_girl).to({y: this.witch_girl.y - 10*resolution}, 1500, Phaser.Easing.Quadratic.InOut).to({y: this.witch_girl.y}, 1500, Phaser.Easing.Quadratic.InOut);
             this.witch_girl.tw_idle.loop();
             this.witch_girl.tw_idle.start();
             }), this)
             }), this);*/
            ((game.add.tween(play.witch_girl).to({x: 270*resolution}, 300, Phaser.Easing.Quadratic.Out, false, 900)).start()).onComplete.add(this.init_tuto, this);

            this.bg_noire = game.add.image(0, 0, "bgnoire");
            this.bg_noire.alpha = .7;
            this.bg_noire.visible = false;
            this.bg_noire.alive = true;


            this.createPause();
        }), this);
    },
    initAtributs: function () {
        this.stateMusic = Music.enableMisic;
        this.timerEndLevel = null;
        this.timerEndLevelAndLose = null;
        this.istimerEndLevel = false;
        this.istimerEndLevelAndLose = false;
        this.gameOver = false;
        this.you_win = false;
        this.pausePlay = false;
        this.isEndAllLevels = false;
    },

    createButtonsPlay: function () {
        this.group_hud = game.add.group();

        var hud = game.add.sprite(game.width/2 + (2*resolution), 27*resolution, 'sprites2', 'Hud'+resolution+'.png');
        hud.anchor.setTo(.5,.5);
        this.group_hud.add(hud);

        this.bnt_pause = new Bouton(this.game, 0, 0, "sprites2", this.funcPause, this);
        this.bnt_pause.frameName = "pausebnt" + resolution + ".png";
        this.bnt_pause.x = 27 * resolution;
        this.bnt_pause.y = 27 * resolution;
        this.group_hud.add(this.bnt_pause)
    },
    game_over: function () {
        if (Music.enableMisic)Music.sounds.play("whoosh");
        this.gameOver = true;
        this.bnt_pause.visible = false;
        this.bg_noire.visible = true;
        this.bgPause.frameName = 'bgLose'+resolution+'.png';
        this.bgPause.x = game.width/2;
        this.groupPause.forEachAlive(function (obj) {
            obj.visible = true
        }, this);
        this.resumebtn.visible = false;
        this.menubntt.x = 125 * resolution;
        this.bnt_replay.x = this.menubntt.x + 75 * resolution;
        this.bnt_replay.y = this.menubntt.y = 350*resolution;
        this.textPause.setText(text.txtgameover);
        this.textPause.updateText();
        this.textPause.x = 100 * resolution;
        this.textPause.y = 225* resolution;
        this.textPauseLevel.x = 104*resolution;
        this.textPauseLevel.y = 202.5*resolution;
        //this.textPauseTarget.x = game.width/2 - this.textPauseTarget.textWidth/2 + 4*resolution;
        //this.textPauseTarget.y += 10*resolution;
        /*this.textPauseScore.setText(text.txtscore+' '+play.current_score);
         this.textPauseScore.updateText();
         this.textPauseScore.x = game.width/2 - this.textPauseScore.textWidth/2 + 4*resolution;
         this.textPauseScore.y += 10*resolution; */
        this.groupPause.y = 400 * resolution;
        game.world.bringToTop(this.bg_noire);
        game.world.bringToTop(this.groupPause);
        this.groupPause.setAll("alpha", 0);
        game.add.tween(this.groupPause).to({y: -50 * resolution}, 350, Phaser.Easing.Quadratic.Out, true, 100).to({y: -35 * resolution}, 200, Phaser.Easing.Quadratic.Out, true, 70);
        game.world.bringToTop(this.bg_noire);
        game.world.bringToTop(this.groupPause);
        this.groupPause.forEach(function (obj) {
            game.add.tween(obj).to({alpha: 1}, 600, Phaser.Easing.Quadratic.Out, true, 150);
        }, this)
    },
    createPause: function () {
        this.bgPause = new Phaser.Sprite(this.game, game.width / 2, 0, "sprites2");
        this.bgPause.frameName = "bgPause" + resolution + ".png";
        this.bgPause.y = game.height/2;
        this.bgPause.anchor.setTo(.5, .5);
        this.bgPause.alive = true;
        this.resumebtn = new Bouton(this.game, this.bgPause.x, this.bgPause.y + 90 * resolution, "sprites2", this.funcResume, this);
        this.resumebtn.frameName = "resumebnt" + resolution + ".png";
        this.resumebtn.alive = true;
        this.menubntt = new Bouton(this.game, this.resumebtn.x - 58 * resolution, this.bgPause.y + 90 * resolution, "sprites2", this.funcBack, this);
        this.menubntt.frameName = "levelsbnt" + resolution + ".png";
        this.menubntt.alive = true;
        this.bnt_replay = new Bouton(this.game, this.resumebtn.x + 58 * resolution, this.bgPause.y + 90 * resolution, "sprites2", this.funReplay, this);
        this.bnt_replay.frameName = "replaybnt" + resolution + ".png";
        this.bnt_replay.alive = true;
        this.groupPause = this.game.add.group();
        this.groupPause.add(this.bgPause);
        this.groupPause.add(this.resumebtn);
        this.groupPause.add(this.menubntt);
        this.groupPause.add(this.bnt_replay);
        //this.textPause = new Phaser.BitmapText(this.game, 90 * resolution, this.bgPause.y - 55 * resolution, "fontb", text.txtPause, 40 * resolution);
        this.textPause = new Phaser.Text(game, 90*resolution, this.bgPause.y + (3*resolution), text.txtPause, {font: (22.5 * resolution) + langFont2, align: 'center', fill: "#ffffff", stroke: "#da4e0b", strokeThickness: 2.5 * resolution});
        this.textPause.alive = true;
        this.textPause.align = "center";
        this.textPause.x = game.width/2 - this.textPause.width/2;
        //this.textPauseLevel = new Phaser.BitmapText(this.game, 135 * resolution, this.bgPause.y - 81 * resolution, "fontb", text.txtlevel + " " + play.numLevel, 19 * resolution);
        this.textPauseLevel = new Phaser.Text(game, 135*resolution, this.bgPause.y + 25 * resolution, text.txtlevel + " " + play.numLevel, {font: (18 * resolution) + langFont2, align: 'center', fill: "#ffffff", stroke: "#975e2b", strokeThickness: 2 * resolution});
        this.textPauseLevel.alive = true;
        //this.textPauseLevel.updateText();
        this.textPauseLevel.x = game.width/2 - this.textPauseLevel.width/2;
        //this.textPauseLevel.scale.setTo(0,0);
        //this.textPauseTarget = new Phaser.BitmapText(this.game, 150 * resolution, this.bgPause.y + (5*resolution), "fontr", text.txttarget + " " + this.nbr_hints, 22 * resolution);
        this.textPauseTarget = new Phaser.Text(game, 150*resolution, this.bgPause.y + (32*resolution), text.txttarget + "" + this.nbr_hints, {font: (18 * resolution) + langFont2, align: 'center', fill: "#ffffff", stroke: "#da4e0b", strokeThickness: 2 * resolution});
        this.textPauseTarget.alive = true;
        //this.textPauseTarget.updateText();
        this.textPauseTarget.x = game.width/2 - this.textPauseTarget.width/2;

        /*this.textPauseScore = new Phaser.BitmapText(this.game, 150 * resolution, this.bgPause.y + (24*resolution), "fontr", text.txtscore + " " + this.current_score, 25 * resolution);
         this.textPauseScore.alive = true;
         this.textPauseScore.updateText();
         this.textPauseScore.x = game.width/2 - this.textPauseScore.textWidth/2 + 4*resolution;  */
        this.groupPause.add(this.textPause);
        //this.groupPause.add(this.textPauseLevel);
        this.groupPause.add(this.textPauseTarget);
        //this.groupPause.add(this.textPauseScore);
        this.groupPause.forEachAlive(function (obj) {
            obj.visible = false
        }, this);
        this.groupPause.y = 400 * resolution
    },
    createCongratulations: function () {
        //if (Music.enableMisic)Music.sounds.play("whoosh");
        this.isEndAllLevels = true;
        this.numLevel = nombre_levels;
        level = sauvegarde.length - 1;
        Save_setItem("WitchCrossward_level", sauvegarde.length - 1);
        this.game.add.image(0, 0, "bgnoire").alpha = .7;
        var bg = this.game.add.image(game.width/2, game.height/2, "sprites2");
        bg.anchor.setTo(.5,.5);
        bg.frameName = "bgPause" + resolution + ".png";
        var b = new Bouton(this.game, game.width / 2, bg.y + 140 * resolution, "sprites2", function () {
            play.InitialiseFade("menu")
        }, this);
        b.frameName = "resumebnt" + resolution + ".png";
        /*var tt = new Phaser.BitmapText(this.game, 42 * resolution, 60 * resolution, "fontOrg", text.textCongratulations, 40 * resolution);
         tt.align = "center";*/
        //var tt2 = new Phaser.BitmapText(this.game, 102 * resolution, 188 * resolution, "fontc", text.textCongratulations2, 28 * resolution);
        var tt2 = new Phaser.Text(game, 0, bg.y + (3*resolution), text.textCongratulations2, {font: (21 * resolution) + langFont2, align: 'center', fill: "#ffffff", stroke: "#da4e0b", strokeThickness: 2.5 * resolution});
        tt2.x = game.width/2 - tt2.width/2;
        tt2.align = "center";
        //this.world.add(tt);
        this.world.add(tt2);
        this.world.add(b)
    },
    createNextLevel: function () {
        if (Music.enableMisic)Music.sounds.play("whoosh");

        game.time.events.add(600, (function(){if (Music.enableMisic) Music.sounds.play('win');}), this);
        this.gameOver = true;
        this.bgPause.frameName = 'bgWin'+resolution+'.png';
        this.bgPause.x = game.width/2;
        this.bnt_pause.visible = false;
        this.next_level = new Bouton(this.game, this.bgPause.x, this.bgPause.y + 90 * resolution, "sprites2", this.funcnextlevel, this);
        this.next_level.frameName = "resumebnt" + resolution + ".png";
        this.next_level.alive = true;
        this.bg_noire.visible = true;
        this.groupNexLevel = this.game.add.group();
        this.next_level.x = this.resumebtn.x;
        this.next_level.y = this.resumebtn.y;

        var bg_effect = new Phaser.Sprite(this.game, game.width/2, 0, 'sprites2', 'decoration_win'+resolution+'.png');
        bg_effect.anchor.setTo(.5,1);
        bg_effect.y -= bg_effect.height/2;
        bg_effect.scale.setTo(0,0);
        var etoile1 = new Phaser.Sprite(this.game, -360 * resolution, 50 * resolution, "sprites2");
        etoile1.frameName = "star" + resolution + ".png";
        etoile1.real_position = {x: 94 * resolution, y: 134.5 * resolution};
        etoile1.alive = true;
        etoile1.angle = -16;
        etoile1.anchor.setTo(.5, .5);
        etoile1.scale.setTo(.88, .88);
        var etoile2 = new Phaser.Sprite(this.game, -360 * resolution, 50 * resolution, "sprites2");
        etoile2.frameName = "star" + resolution + ".png";
        etoile2.real_position = {x: game.width/2 - (4.5*resolution), y: 117.5 * resolution};
        etoile2.anchor.setTo(.5, .5);
        etoile2.alive = true;
        var etoile3 = new Phaser.Sprite(this.game, -360 * resolution, 50 * resolution, "sprites2");
        etoile3.frameName = "star" + resolution + ".png";
        etoile3.real_position = {x: 217.5 * resolution, y: 134 * resolution};
        etoile3.alive = true;
        etoile3.angle = 23;
        etoile3.anchor.setTo(.5, .5);
        etoile3.scale.setTo(.88, .88);
        //this.bgPause.frameName = "bgWin" + resolution + ".png";
        this.menubntt.y = this.bnt_replay.y = this.next_level.y;
        this.world.add(bg_effect);
        this.groupNexLevel.add(this.bgPause);
        this.groupNexLevel.add(this.next_level);
        this.groupNexLevel.add(this.menubntt);
        this.groupNexLevel.add(this.bnt_replay);
        this.groupNexLevel.add(etoile1);
        this.groupNexLevel.add(etoile2);
        this.groupNexLevel.add(etoile3);

        //this.number_etoiles = 3;
        if (this.number_etoiles == 1) {
            game.add.tween(etoile2).to({x: etoile2.real_position.x, y: etoile2.real_position.y}, 1e3, Phaser.Easing.Back.Out, true, 120);
            /*game.time.events.add(1370, function () {
             (game.add.tween(this).to({y: this.y - 10 * resolution}, 800, Phaser.Easing.Quadratic.InOut).to({y: this.y + 10 * resolution}, 800, Phaser.Easing.Quadratic.InOut).loop()).start();
             }, etoile2);*/
        } else if (this.number_etoiles > 1) {
            game.add.tween(etoile1).to({x: etoile1.real_position.x, y: etoile1.real_position.y}, 1e3, Phaser.Easing.Back.Out, true, 120);
            /*game.time.events.add(1370, function () {
             (game.add.tween(this).to({y: this.y - 10 * resolution}, 800, Phaser.Easing.Quadratic.InOut).to({y: this.y + 10 * resolution}, 800, Phaser.Easing.Quadratic.InOut).loop()).start();
             }, etoile1)*/
        }
        if (this.number_etoiles >= 2) {
            game.add.tween(etoile2).to({x: etoile2.real_position.x, y: etoile2.real_position.y}, 1e3, Phaser.Easing.Back.Out, true, 240);
            /*game.time.events.add(1370, function () {
             (game.add.tween(this).to({y: this.y - 10 * resolution}, 800, Phaser.Easing.Quadratic.InOut).to({y: this.y + 10 * resolution}, 800, Phaser.Easing.Quadratic.InOut).loop()).start();
             }, etoile2)*/
        }
        if (this.number_etoiles >= 3) {
            game.add.tween(etoile3).to({x: etoile3.real_position.x, y: etoile3.real_position.y}, 1e3, Phaser.Easing.Back.Out, true, 360);
            /*game.time.events.add(1370, function () {
             (game.add.tween(this).to({y: this.y - 10 * resolution}, 800, Phaser.Easing.Quadratic.InOut).to({y: this.y + 10 * resolution}, 800, Phaser.Easing.Quadratic.InOut).loop()).start();
             }, etoile3)*/
        }
        /*var score_word = new Phaser.BitmapText(this.game, 120 * resolution, 225 * resolution, "fontOrg", text.txtscore, 30 * resolution);
         score_word.align = "center";
         score_word.alive = true;
         score_word.x = game.width / 2 - score_word.textWidth / 2;
         this.groupNexLevel.add(score_word);
         this.txt_score_win = new Phaser.BitmapText(this.game, 120 * resolution, score_word.y + 25 * resolution, "fontc", "" + 54780, 45 * resolution);
         this.txt_score_win.align = "center";
         this.txt_score_win.alive = true;
         this.groupNexLevel.add(this.txt_score_win);*/

        //this.groupNexLevel.add(this.textPauseScore);
        //this.textPauseLevel.x = game.width/2 - this.textPauseLevel.width/2 + 4*resolution;
        this.textPauseTarget.setText(text.txttarget + this.nbr_hints);
        this.textPauseTarget.x = game.width/2 - this.textPauseTarget.width/2 + 4*resolution;
        this.textPauseTarget.y -= 20*resolution;
        //this.groupNexLevel.add(this.textPauseLevel);
        this.groupNexLevel.add(this.textPauseTarget);

        /*this.textPauseScore.setText(text.txtscore+' '+play.current_score);
         this.textPauseScore.updateText();
         this.textPauseScore.x = game.width/2 - this.textPauseScore.textWidth/2 + 4*resolution; */
        //var tt = new Phaser.BitmapText(this.game, 82 * resolution, this.bgPause.y - 47 * resolution, "fontb", text.youwin, 32 * resolution);
        var tt = new Phaser.Text(game, 82*resolution, this.bgPause.y - 70 * resolution, text.youwin, {font: (22.5 * resolution) + langFont2, align: 'center', fill: "#ffffff", stroke: "#da4e0b", strokeThickness: 2.5 * resolution});
        tt.x = game.width/2 - tt.width/2;
        tt.align = "center";
        tt.alive = true;
        this.groupNexLevel.add(tt);
        this.groupNexLevel.y = 400 * resolution;
        this.groupNexLevel.forEach(function (obj) {
            if (obj != this.etoilEnd1 && obj != this.etoilEnd2 && obj != this.etoilEnd3)obj.alpha = 0
        }, this);
        (game.add.tween(bg_effect.scale).to({x: 1.15, y: 1.15}, 450, Phaser.Easing.Elastic.Out, false, 1000)).start();
        game.add.tween(this.groupNexLevel).to({y: -75 * resolution}, 350, Phaser.Easing.Quadratic.Out, true, 100).to({y: -60 * resolution}, 200, Phaser.Easing.Quadratic.Out, true, 70);
        game.world.bringToTop(this.bg_noire);
        game.world.bringToTop(bg_effect);
        game.world.bringToTop(this.groupNexLevel);
        this.groupNexLevel.forEach(function (obj) {
            game.add.tween(obj).to({alpha: 1}, 600, Phaser.Easing.Quadratic.Out, true, 150)
        }, this);
        this.groupNexLevel.forEachAlive(function (obj) {
            obj.visible = true
        }, this)
    },
    funcnextlevel: function () {
        if (this.numLevel <= nombre_levels) {
            this.numLevel++
        }

        if (play.numLevel <= nombre_levels)
            play.InitialiseFade("levels");
        else
            play.InitialiseFade("play");
    },
    cacherPause: function () {
        this.bnt_pause.visible = false;
        this.groupPause.forEachAlive(function (obj) {
            obj.visible = true
        }, this);
        this.bg_noire.visible = true
    },
    funcPause: function () {
        if (this.istimerEndLevel || this.istimerEndLevelAndLose || this.objectives_finished)return;
        if (Music.enableMisic)Music.sounds.play("whoosh");
        if (this.stateMusic) {
            Music.enableMisic = false;
            Music.music.pause()
        }
        this.cacherPause();
        this.pausePlay = true;
        /*this.textPauseScore.setText(text.txtscore+' '+play.current_score);
         this.textPauseScore.updateText();
         this.textPauseScore.x = game.width/2 - this.textPauseScore.textWidth/2 + 19*resolution;  */
        this.groupPause.setAll("alpha", 0);
        game.add.tween(this.groupPause).to({y: -50 * resolution}, 350, Phaser.Easing.Quadratic.Out, true, 100).to({y: -35 * resolution}, 200, Phaser.Easing.Quadratic.Out, true, 70);
        game.world.bringToTop(this.bg_noire);
        game.world.bringToTop(this.groupPause);
        this.groupPause.forEach(function (obj) {
            game.add.tween(obj).to({alpha: 1}, 600, Phaser.Easing.Quadratic.Out, true, 150)
        }, this);
        game.input.onUp.active = false;
    },
    funcResume: function () {
        if (this.stateMusic) {
            Music.enableMisic = true;
            Music.music.resume()
        }
        this.afficherPause();
        this.pausePlay = false;
        game.time.events.add(300, function () {
            if (Music.enableMisic)Music.sounds.play("whoosh")
        }, this);
        game.add.tween(this.groupPause).to({y: -50 * resolution}, 350, Phaser.Easing.Quadratic.Out, true, 100).to({y: 400 * resolution}, 300, Phaser.Easing.Quadratic.Out, true).onComplete.add(function () {
            this.bg_noire.visible = false
        }, this);
        this.groupPause.forEach(function (obj) {
            game.add.tween(obj).to({alpha: 0}, 600, Phaser.Easing.Quadratic.Out, true, 400)
        }, this);
        game.input.onUp.active = true;
    },
    afficherPause: function () {
        this.bnt_pause.visible = true
    },
    funReplay: function () {
        if (this.stateMusic && this.pausePlay) {
            Music.enableMisic = true;
            Music.music.resume()
        }

        sauvegarde[play.numLevel - 1].time = play.bonus_time;
        save_ecrit();

        play.InitialiseFade("play")
    },
    funcBack: function () {
        if (this.stateMusic) {
            Music.enableMisic = true;
            Music.music.resume()
        }
        play.InitialiseFade("levels");

        sauvegarde[play.numLevel - 1].time = play.bonus_time;
        save_ecrit();
    },
    calculer_etoiles: function () {

    },

    Fin_level: function (showNextLevel) {
        play.calculer_etoiles();

        if (play.number_etoiles > sauvegarde[play.numLevel - 1].numetoile) {
            sauvegarde[play.numLevel - 1].numetoile = play.number_etoiles
        }

        sauvegarde[play.numLevel - 1].time = 0;
        save_ecrit();

        if (showNextLevel) play.createNextLevel();
    },

    update: function () {
        if (play.container_notification != null && play.container_notification.alive) return;

        if (this.you_win && this.groupNexLevel.y > 0) {
            this.groupNexLevel.y -= 15
        }
        /*if (+this.txt_score.text < this.current_score) {
         this.txt_score.setText("" + (+this.txt_score.text + 5));
         this.txt_score.updateText();
         this.txt_score.x = game.width / 2 - this.txt_score.textWidth / 2 + (3*resolution);
         }
         if (this.txt_score_win != null) {
         if (+this.txt_score_win.text < this.current_score && this.current_score < 1500 || +this.txt_score_win.text < 1500 && this.current_score >= 1500)this.txt_score_win.setText("" + (+this.txt_score_win.text + 10)); else this.txt_score_win.setText("" + this.current_score);
         this.txt_score_win.updateText();
         this.txt_score_win.x = game.width / 2 - this.txt_score_win.textWidth / 2
         } */

        if (this.gameOver || this.you_win || this.pausePlay)return;
        if (this.isEndAllLevels)return;
        if (this.istimerEndLevel && this.timerEndLevel != null) {
            this.timerEndLevel -= this.game.time.elapsed;
            if (this.timerEndLevel < 0) {
                this.istimerEndLevel = false;
                //play.Witch_Happy_Animation();
                ((game.add.tween(play.witch_girl).to({x: -game.width*2}, 800, Phaser.Easing.Back.In, false, 500)).start()).onComplete.add((function(){
                    this.Fin_level(true);
                    play.witch_girl.loadTexture('witch_veryhappy');
                    play.witch_girl.scale.x = -1;
                    play.witch_girl.animations.add('veryhappy', [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,19,19]);
                    play.witch_girl.animations.play('veryhappy', 40, true, false);
                    play.witch_girl.bringToTop();
                    (game.add.tween(play.witch_girl).to({x: 150*resolution, y: 380*resolution}, 700, Phaser.Easing.Quadratic.Out)).start();
                }), this);

            }
        }
        if (this.istimerEndLevelAndLose && this.timerEndLevelAndLose != null) {
            this.timerEndLevelAndLose -= this.game.time.elapsed;
            if (this.timerEndLevelAndLose < 0) {
                this.game_over();
                this.istimerEndLevelAndLose = false
            }
        }


        // *************************************** //

        if (this.cell_selected != null && game.input.activePointer.isDown){

        }

        this.Time_Update();
        // *************************************** //

    },

    Activate_Input_Down: function (sprite, bool) {
        if (sprite.events.onInputDown != null)sprite.events.onInputDown.active = bool
    },

    Activate_Input_Up: function (sprite, bool) {
        if (sprite.events.onInputUp != null)sprite.events.onInputUp.active = bool
    },

    Activate_Input_Over: function (sprite, bool) {
        if (sprite.events.onInputOver != null)sprite.events.onInputOver.active = bool
    },

    creer_text_score: function(sprite, txt_score, txtsize){
        if (sprite.txt_created != null){
            if (sprite.score == 0 || sprite.txt_created || txt_score == 0) return;
            sprite.txt_created = true;
            //var txt_score_sp = game.add.bitmapText(sprite.x, sprite.y - (10*resolution), 'fontOrg', txt_score, txtsize);
            var txt_score_sp = game.add.text(sprite.x, sprite.y - (10*resolution), ''+txt_score, {font: txtsize + langFont2, align: 'center', fill: "#ffffff", stroke: "#000000", strokeThickness: 2.5 * resolution});
        }else{
            //var txt_score_sp = game.add.bitmapText(sprite.x, sprite.y - (10*resolution), 'fontOrg', txt_score, txtsize);
            var txt_score_sp = game.add.text(sprite.x, sprite.y - (10*resolution), ''+txt_score, {font: txtsize + langFont2, align: 'center', fill: "#ffffff", stroke: "#000000", strokeThickness: 2.5 * resolution});
        }
        //txt_score_sp.updateText();
        txt_score_sp.align = 'center';
        txt_score_sp.x -=  txt_score_sp.width/2;
        if (txt_score.y >= game.height/2)
            txt_score.y -= txt_score.width/2;
        else
            txt_score.y += txt_score.textHeight/2;

        if (txt_score_sp.x - txt_score_sp.width/2 <= 0)
            txt_score_sp.x += txt_score_sp.width/2;
        else if (txt_score_sp.x + txt_score_sp.width/2 >= game.width)
            txt_score_sp.x -= txt_score_sp.width/2;

        txt_score_sp.initY = txt_score_sp.y;
        txt_score_sp.scale.setTo(.1,.1);

        this.game.add.tween(txt_score_sp.scale).to({x:1.6,y:1.4}, 200, Phaser.Easing.Quadratic.Out, true, 100)
            .to({x: 1.2,y:1.2}, 1000, Phaser.Easing.Elastic.Out, true);

        (game.add.tween(txt_score_sp).to({y: txt_score_sp.initY - (10*resolution), alpha: 0}, 600 , Phaser.Easing.Linear.None, true, 700)).onComplete.add((function(){
            this.visible = false;
            this.destroy();
        }), txt_score_sp);
    },

    InitialiseFade: function (state) {
        if (play.bgnoire == null)play.bgnoire = game.add.image(0, 0, "bgnoire");
        play.bgnoire.alpha = 0;
        game.add.tween(play.bgnoire).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true).onComplete.add(function () {
            game.time.events.add(100, function () {
                game.state.start(this, true);
                play.bgnoire.alpha = 0;
                play.bgnoire.kill();
                play.bgnoire = null
            }, this)
        }, state)
    },

    create_grid: function(){
        //console.log(this.scale_moins);

        this.left_bound = game.width;
        this.right_bound = 0;
        this.top_bound = game.height;
        this.bottom_bound = 0;

        this.mat_sprites = [];
        for (var ii=0; ii<this.rows; ii++){
            this.mat_sprites[ii] = [];
            for (var jj=0; jj<this.cols; jj++){
                this.mat_sprites[ii][jj] = {bg_cell: null, txt_letter: null, bg_cover: null};
            }
        }

        for (var i = 0; i<this.cols; i++){
            for (var j=0; j<this.rows; j++){
                if (this.best_mat[i][j] != ''){
                    this.mat_sprites[i][j].ind_i = i;
                    this.mat_sprites[i][j].ind_j = j;
                    this.mat_sprites[i][j].direction_vertical = 0;
                    this.mat_sprites[i][j].bg_cell = game.add.image(j*this.taille, i*this.taille, 'squares', 0);

                    this.mat_sprites[i][j].bg_cell.scale.setTo(1-this.scale_moins, 1-this.scale_moins);
                    this.mat_sprites[i][j].bg_cell.x -= (this.taille*j)*this.scale_moins;
                    this.mat_sprites[i][j].bg_cell.y -= (this.taille*i)*this.scale_moins;
                    this.mat_sprites[i][j].bg_cell.alive = true;
                    this.mat_sprites[i][j].bg_cell.inputEnabled = true;
                    this.mat_sprites[i][j].bg_cell.events.onInputDown.add(this.TapDown, this.mat_sprites[i][j]);

                    if (this.left_bound > this.mat_sprites[i][j].bg_cell.x)
                        this.left_bound = this.mat_sprites[i][j].bg_cell.x;

                    if (this.right_bound < this.mat_sprites[i][j].bg_cell.x)
                        this.right_bound = this.mat_sprites[i][j].bg_cell.x;

                    if (this.top_bound > this.mat_sprites[i][j].bg_cell.y)
                        this.top_bound = this.mat_sprites[i][j].bg_cell.y;

                    if (this.bottom_bound < this.mat_sprites[i][j].bg_cell.y)
                        this.bottom_bound = this.mat_sprites[i][j].bg_cell.y;

                    this.mat_sprites[i][j].txt_letter = game.add.text(j*this.taille  + (5*resolution), i*this.taille + (3*resolution), this.best_mat[i][j].toUpperCase(), {
                        font: (12 * resolution - (12*resolution*this.scale_moins)) + langFont,
                        align: 'center',
                        fill: '#d82d32'
                    });
                    this.mat_sprites[i][j].txt_letter.alive = true;
                    this.mat_sprites[i][j].txt_letter.x = this.mat_sprites[i][j].bg_cell.x + this.mat_sprites[i][j].bg_cell.width/2 - this.mat_sprites[i][j].txt_letter.width/2;
                    this.mat_sprites[i][j].txt_letter.y = this.mat_sprites[i][j].bg_cell.y + this.mat_sprites[i][j].bg_cell.height/2 - this.mat_sprites[i][j].txt_letter.height/2;

                    this.nbr_letters_level++;

                    if (this.mat_player[i][j] == '*')
                        this.mat_sprites[i][j].txt_letter.visible = false;
                    else
                        this.nbr_letters_found++;

                    this.groupCells.add(this.mat_sprites[i][j].bg_cell);
                    this.groupCells.add(this.mat_sprites[i][j].txt_letter);
                }
            }
        }

        for (var i = 0; i<this.cols; i++){
            for (var j=0; j<this.rows; j++){
                if (this.best_mat[i][j] != ''){
                    this.mat_sprites[i][j].bg_cell.x += (game.width/2) - this.left_bound - (this.right_bound-this.left_bound)/2 - this.mat_sprites[i][j].bg_cell.width/2;
                    this.mat_sprites[i][j].bg_cell.y += (game.height/2) - this.top_bound - (this.bottom_bound-this.top_bound)/2 - (20*resolution);

                    this.mat_sprites[i][j].txt_letter.x = this.mat_sprites[i][j].bg_cell.x + this.mat_sprites[i][j].bg_cell.width/2 - this.mat_sprites[i][j].txt_letter.width/2 - (0.5*resolution);
                    this.mat_sprites[i][j].txt_letter.y = this.mat_sprites[i][j].bg_cell.y + this.mat_sprites[i][j].bg_cell.height/2 - this.mat_sprites[i][j].txt_letter.height/2 - (2*resolution);

                    if (this.mat_sprites[i][j].bg_cell.x + this.mat_sprites[i][j].bg_cell.width/2 >= game.width - (3*resolution) || this.mat_sprites[i][j].bg_cell.x - this.mat_sprites[i][j].bg_cell.width/2 <= 0 || this.mat_sprites[i][j].bg_cell.y - this.mat_sprites[i][j].bg_cell.height/2 <= 50*resolution){
                        this.scale_moins += 0.05;

                        for (var ii = 0; ii<this.cols; ii++){
                            for (var jj=0; jj<this.rows; jj++){
                                if (this.mat_sprites[ii][jj]){
                                    if (this.mat_sprites[ii][jj].bg_cell) this.mat_sprites[ii][jj].bg_cell.destroy();
                                    if (this.mat_sprites[ii][jj].txt_letter) this.mat_sprites[ii][jj].txt_letter.destroy();
                                }
                            }
                        }
                        this.create_grid();
                        return;
                    }
                }
            }
        }
    },

    TapDown: function(){
        //if (play.tuto) return;

        play.cell_selected = this;
        play.cell_selected.first_i = -1;
        play.cell_selected.last_i = -1;
        play.cell_selected.first_j = -1;
        play.cell_selected.last_j = -1;

        play.time_debut_swip = game.time.now ;
        play.debut_swip.x =  game.input.activePointer.x ;
        play.debut_swip.y =  game.input.activePointer.y ;
    },

    deplacer : function(){
        if (play.numLevel == 1 && play.tuto && play.tuto.text == text.txttuto2){
            play.tuto.setText(text.txttuto3);
            play.tuto.x = play.bg_tuto.x + play.bg_tuto.width/2 - play.tuto.width/2 - (5*resolution);
            play.tuto.y = play.bg_tuto.y + play.bg_tuto.height/2 - play.tuto.height/2 - (3*resolution);
        }else if (play.numLevel == 1 && play.tuto && play.tuto.text == text.txttuto3){
            (game.add.tween(play.witch_girl).to({x: 45*resolution, y: 100*resolution}, 250, Phaser.Easing.Quadratic.Out, false, 150)).start();
            play.bg_tuto_noir.destroy();
            play.bg_tuto.destroy();
            play.tuto.destroy();
            play.tuto = null;
        }

        if(this.gameOver || this.pausePlay || !this.cell_selected || this.info_selected.word.length > 0) return;

        if (game.time.elapsedSince(this.time_debut_swip)>=100 && game.time.elapsedSince(this.time_debut_swip)<2500) {
            var dx = game.input.activePointer.x - this.debut_swip.x;
            var dy = game.input.activePointer.y - this.debut_swip.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist >= (20*resolution)){

                var direction = 1;

                var anglevect = Phaser.Math.angleBetween(this.debut_swip.x, this.debut_swip.y, game.input.activePointer.x, game.input.activePointer.y);
                anglevect = (anglevect * 180) / Math.PI;
                if (anglevect < 0) anglevect += 360;

                if (anglevect <= 45 || anglevect > 315) {
                    this.cell_selected.direction_vertical = 0;
                    if (dx >= 0) direction = 1; else direction = -1;
                    this.select_word_horizontal(this.cell_selected, direction);
                } else if (anglevect <= 225 && anglevect > 135) {
                    this.cell_selected.direction_vertical = 0;
                    if (dx >= 0) direction = 1; else direction = -1;
                    this.select_word_horizontal(this.cell_selected, direction);
                } else if (anglevect <= 315 && anglevect > 225) {
                    this.cell_selected.direction_vertical = 1;
                    if (dy >= 0) direction = 1; else direction = -1;
                    this.select_word_vertical(this.cell_selected, direction);
                } else if (anglevect <= 135 && anglevect > 45) {
                    this.cell_selected.direction_vertical = 1;
                    if (dy >= 0) direction = 1; else direction = -1;
                    this.select_word_vertical(this.cell_selected, direction);
                }
            }
        }
    },

    select_word_horizontal: function(cell, direction){
        // direction = 1 -> Move Right
        // direction = -1 -> Move Left

        var nbr_cells_selected = 0;
        var first_j = 0;
        var last_j = 0;

        if (cell.ind_j > 0){
            for (var j=cell.ind_j;j>=0;j--){
                if (this.mat_sprites[cell.ind_i][j].bg_cell){
                    nbr_cells_selected++;
                }else{
                    first_j = j+1;
                    break;
                }
            }
        }

        if (cell.ind_j < play.rows){
            for (var jj=cell.ind_j;jj<play.rows;jj++){
                if (this.mat_sprites[cell.ind_i][jj].bg_cell){
                    nbr_cells_selected++;
                }else{
                    last_j = jj-1;
                    break;
                }
            }
        }

        if (nbr_cells_selected >= 3){
            var delay_coloring = 1;
            for (var x=first_j; x<=last_j; x++){
                if (this.mat_sprites[cell.ind_i][x].bg_cell){
                    play.info_selected.word += this.mat_sprites[cell.ind_i][x].txt_letter.text;
                    if (this.mat_sprites[cell.ind_i][x].txt_letter.visible)
                        this.info_selected.visible_letters += this.mat_sprites[cell.ind_i][x].txt_letter.text;
                    else
                        this.info_selected.visible_letters += '*';
                }
            }

            if (direction == 1){
                for (var x=first_j; x<=last_j; x++){
                    if (this.mat_sprites[cell.ind_i][x].bg_cell){
                        game.time.events.add(delay_coloring, (function(){
                            this.bg_cell.frame = 1;
                            game.time.events.add(500, (function(){
                                this.bg_cell.frame = 0;
                            }), this);
                        }), this.mat_sprites[cell.ind_i][x]);
                        delay_coloring += 50;
                    }
                }
            }else{
                for (var x=last_j; x>=first_j; x--){
                    if (this.mat_sprites[cell.ind_i][x].bg_cell){
                        game.time.events.add(delay_coloring, (function(){
                            this.bg_cell.frame = 1;
                            game.time.events.add(500, (function(){
                                this.bg_cell.frame = 0;
                            }), this);
                        }), this.mat_sprites[cell.ind_i][x]);
                        delay_coloring += 50;
                    }
                }
            }

            play.cell_selected.first_j = first_j;
            play.cell_selected.last_j = last_j;
            this.Get_info_selected();
            //if (this.hand && this.hand.alive)this.hand.kill();
        }
    },

    select_word_vertical: function(cell, direction){
        // direction = 1 -> Move Down
        // direction = -1 -> Move Up

        var nbr_cells_selected = 0;
        var first_i = 0;
        var last_i = 0;

        if (cell.ind_i > 0){
            for (var i=cell.ind_i;i>=0;i--){
                if (this.mat_sprites[i][cell.ind_j].bg_cell){
                    nbr_cells_selected++;
                }else{
                    first_i = i+1;
                    break;
                }
            }
        }

        if (cell.ind_i < play.cols){
            for (var ii=cell.ind_i;ii<play.cols;ii++){
                if (this.mat_sprites[ii][cell.ind_j].bg_cell){
                    nbr_cells_selected++;
                }else{
                    last_i = ii-1;
                    break;
                }
            }
        }

        if (nbr_cells_selected >= 3){
            var delay_coloring = 1;
            for (var y=first_i; y<=last_i; y++){
                if (this.mat_sprites[y][cell.ind_j].bg_cell){
                    play.info_selected.word += this.mat_sprites[y][cell.ind_j].txt_letter.text;
                    if (this.mat_sprites[y][cell.ind_j].txt_letter.visible)
                        this.info_selected.visible_letters += this.mat_sprites[y][cell.ind_j].txt_letter.text;
                    else
                        this.info_selected.visible_letters += '*';
                }
            }
            if (direction == 1){
                for (var y=first_i; y<=last_i; y++){
                    if (this.mat_sprites[y][cell.ind_j].bg_cell){
                        game.time.events.add(delay_coloring, (function(){
                            this.bg_cell.frame = 1;
                            game.time.events.add(500, (function(){
                                this.bg_cell.frame = 0;
                            }), this);
                        }), this.mat_sprites[y][cell.ind_j]);
                        delay_coloring += 50;
                    }
                }
            }else{
                for (var y=last_i; y>=first_i; y--){
                    if (this.mat_sprites[y][cell.ind_j].bg_cell){
                        game.time.events.add(delay_coloring, (function(){
                            this.bg_cell.frame = 1;
                            game.time.events.add(500, (function(){
                                this.bg_cell.frame = 0;
                            }), this);
                        }), this.mat_sprites[y][cell.ind_j]);
                        delay_coloring += 50;
                    }
                }
            }

            play.cell_selected.first_i = first_i;
            play.cell_selected.last_i = last_i;
            this.Get_info_selected();
            //if (this.hand && this.hand.alive)this.hand.kill();
        }
    },

    Get_info_selected: function(){
        if (this.info_selected.word.length <= 0) return;

        for (var i=0; i<words.length; i++){
            if (words[i].response.toUpperCase() == this.info_selected.word){
                this.info_selected.category = words[i].category;
                this.info_selected.question = words[i].question;
                this.info_selected.choices = words[i].choices;
                this.info_selected.ind = i;
            }
        }

        game.time.events.add(500, this.ShowMenuWord, this);
    },

    createMenuWord: function(){
        this.groupMenuWord = game.add.group();

        this.bg_question = game.add.sprite(game.width/2, 180*resolution, 'sprites2', 'bg_question'+resolution+'.png');
        this.bg_question.anchor.setTo(.5,.5);

        this.bg_category = game.add.sprite(game.width/2 - (35*resolution), this.bg_question.y - this.bg_question.height/2 + (15*resolution), 'sprites2', 'bg_category'+resolution+'.png');
        this.bg_category.anchor.setTo(.5,.5);

        this.txt_category = game.add.text(0, 0, 'category', {
            font: (17 * resolution) + langFont,
            align: 'center',
            fill: "#a46859",
            stroke: "#000000",
            strokeThickness: 0
        });
        this.txt_category.x = this.bg_category.x - this.txt_category.width / 2;
        this.txt_category.y = this.bg_category.y - this.txt_category.height / 2;

        this.txt_question = game.add.text(0, 0, 'question', {
            font: (18 * resolution) + langFont,
            align: 'center',
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2.5 * resolution,
            wordWrap: true,
            wordWrapWidth: 253*resolution
        });
        this.txt_question.x = this.bg_question.x - this.txt_question.width / 2;
        this.txt_question.y = this.bg_question.y - this.txt_question.height / 2 + (20*resolution);

        this.img_question = game.add.sprite(this.bg_question.x, this.bg_question.y + (5*resolution), 'images', 0);
        this.img_question.anchor.setTo(.5,.5);
        this.img_question.kill();

        this.bnt_exit = new Bouton(game, 295*resolution, 90*resolution, 'sprites2', this.CloseMenuWord, this);
        this.bnt_exit.frameName = 'exit_bnt'+resolution+'.png';
        this.bnt_show = new Bouton(game, 96*resolution, 305*resolution, 'sprites2', this.ShowLetter, this);
        this.bnt_show.frameName = 'bnt_show'+resolution+'.png';
        this.bnt_delete = new Bouton(game, 226*resolution, 305*resolution, 'sprites2', this.DeleteLetter, this);
        this.bnt_delete.frameName = 'bnt_delete'+resolution+'.png';

        this.groupMenuWord.add(this.bg_question);
        this.groupMenuWord.add(this.bg_category);
        this.groupMenuWord.add(this.txt_category);
        this.groupMenuWord.add(this.txt_question);
        this.groupMenuWord.add(this.img_question);
        this.groupMenuWord.add(this.bnt_exit);
        this.groupMenuWord.add(this.bnt_show);
        this.groupMenuWord.add(this.bnt_delete);

        // Cells Letters
        for (var i=0; i<2; i++){
            for (var j=0; j<7; j++){
                var cell_letter = game.add.sprite(0, 0, 'container_letter', 0);
                cell_letter.x = 33*resolution + (j*(cell_letter.width + (5*resolution)));
                cell_letter.y = 400*resolution + (i*(cell_letter.height + (5*resolution)));
                cell_letter.anchor.setTo(.5,.5);
                cell_letter.ind = -1;

                var letter = game.add.text(cell_letter.x, cell_letter.y, '', {
                    font: (22 * resolution) + langFont,
                    align: 'center',
                    fill: '#d82d32'
                });
                letter.x = cell_letter.x - letter.width/2 - (2*resolution);
                letter.y = cell_letter.y - letter.height/2 - (8*resolution);
                letter.visible = false;

                cell_letter.inputEnabled = true;
                cell_letter.events.onInputDown.add(this.InsertLetter, {cell: cell_letter, letter: letter});

                this.vect_cell_letters.push({cell: cell_letter, letter: letter});
                cell_letter.ind = this.vect_cell_letters.length-1;
                //this.vect_cell_letters[this.vect_cell_letters.length-1].cell.ind = this.vect_cell_letters.length-1;
                this.groupMenuWord.add(cell_letter);
                this.groupMenuWord.add(letter);
            }
        }

        this.groupMenuWord.x = game.width*1.5;
    },

    createCellResponse: function(nbr_cells){
        // Cells Response

        for (var x=0; x<nbr_cells; x++){
            var cell_response = game.add.sprite(0, 350*resolution, 'container_letter', 0);
            //cell_response.width = 30*resolution;
            //cell_response.height = 30*resolution;
            cell_response.scale.setTo(.8,.8);
            var beginX = game.width/2 - (nbr_cells*((cell_response.width)/2)) + (cell_response.width)/2;
            cell_response.x = beginX + (x*cell_response.width);
            cell_response.anchor.setTo(.5,.5);
            cell_response.ind = x;
            cell_response.ind_question = -1;

            var letter_response = game.add.text(cell_response.x, cell_response.y, '', {
                font: (18 * resolution) + langFont,
                align: 'center',
                fill: '#d82d32'
            });

            if (this.info_selected.visible_letters[x] != '*'){
                letter_response.setText(this.info_selected.visible_letters[x]);
                cell_response.frame = 1;
                play.nbr_letters_response++;
            }else
                letter_response.visible = false;

            letter_response.x = cell_response.x - letter_response.width/2 - (0.5*resolution);
            letter_response.y = cell_response.y - letter_response.height/2 - (3.5*resolution);

            cell_response.inputEnabled = true;
            cell_response.events.onInputDown.add(this.RemoveLetter, {cell: cell_response, letter: letter_response});

            this.vect_cell_response.push({cell: cell_response, letter: letter_response});
            this.groupMenuWord.add(cell_response);
            this.groupMenuWord.add(letter_response);
        }
    },

    InsertLetter: function(){
        if(play.gameOver || play.pausePlay || play.istimerEndLevel || play.istimerEndLevelAndLose || play.tuto) return;

        for (var i=0; i<play.vect_cell_response.length; i++){
            if (!play.vect_cell_response[i].letter.visible){
                //if (Music.enableMisic) Music.sounds.play('select_letter');
                play.snd_remove++;

                if (play.snd_remove == 1){
                    if (Music.enableMisic) Music.sounds.play('select_letter');
                }else if (play.snd_remove == 2){
                    if (Music.enableMisic) Music.sounds.play('select_letter2');
                }else if (play.snd_remove >= 3){
                    if (Music.enableMisic) Music.sounds.play('select_letter3');
                }else if (play.snd_remove >= 4){
                    if (Music.enableMisic) Music.sounds.play('select_letter4');
                }else if (play.snd_remove >= 5){
                    if (Music.enableMisic) Music.sounds.play('select_letter5');
                }else if (play.snd_remove >= 6){
                    if (Music.enableMisic) Music.sounds.play('select_letter6');
                }else if (play.snd_remove >= 7){
                    if (Music.enableMisic) Music.sounds.play('select_letter7');
                }else if (play.snd_remove >= 8){
                    if (Music.enableMisic) Music.sounds.play('select_letter8');
                }

                play.vect_cell_response[i].letter.setText(this.letter.text);
                play.vect_cell_response[i].letter.x = play.vect_cell_response[i].cell.x - play.vect_cell_response[i].letter.width/2 - (0.5*resolution);
                play.vect_cell_response[i].letter.y = play.vect_cell_response[i].cell.y - play.vect_cell_response[i].letter.height/2 - (3.5*resolution);
                play.vect_cell_response[i].cell.ind_question = this.cell.ind;
                play.vect_cell_response[i].letter.visible = true;
                this.letter.visible = false;
                this.cell.visible = false;
                play.nbr_letters_response++;

                if (play.nbr_letters_response >= play.vect_cell_response.length)
                    play.CorrectionWord();

                break;
            }
        }
    },

    RemoveLetter: function(){
        if(play.gameOver || play.pausePlay || play.istimerEndLevel || play.istimerEndLevelAndLose || play.tuto) return;
        if (this.cell.frame != 0 || !this.letter.visible) return;

        if (Music.enableMisic) Music.sounds.play('remove_letter');

        this.letter.visible = false;
        play.vect_cell_letters[this.cell.ind_question].cell.visible = true;
        play.vect_cell_letters[this.cell.ind_question].letter.visible = true;
        this.cell.ind_question = -1;
        play.nbr_letters_response--;

        if (play.snd_remove > 0) play.snd_remove--;
    },

    ShowMenuWord: function(){
        if(play.gameOver || play.pausePlay || play.istimerEndLevel || play.istimerEndLevelAndLose) return;
        if (this.info_selected.word.length <= 0) return;

        if (Music.enableMisic)Music.sounds.play("whoosh");

        this.txt_category.setText(this.info_selected.category);
        this.txt_category.x = this.bg_category.x - this.txt_category.width / 2 + (4*resolution);
        this.txt_category.y = this.bg_category.y - this.txt_category.height / 2 - (2*resolution);

        if (this.info_selected.category == 'Photo'){
            this.txt_question.setText('');
            this.img_question.revive();
            this.img_question.frame = +this.info_selected.question;
        }else{
            if (this.img_question.alive) this.img_question.kill();
            this.txt_question.setText(this.info_selected.question);
            this.txt_question.x = this.bg_question.x - this.txt_question.width / 2;
            this.txt_question.y = this.bg_question.y - this.txt_question.height / 2 + (5*resolution);
        }

        this.createCellResponse(this.info_selected.word.length);

        //console.log(this.info_selected);

        var nbr_cell_visible = 0;
        for (var ii=0; ii<this.vect_cell_response.length; ii++){
            if (this.vect_cell_response[ii].letter.visible)
                nbr_cell_visible++;
        }

        if (nbr_cell_visible < this.vect_cell_response.length){
            var word_selected = this.info_selected.word+this.info_selected.choices;

            for (var i=0; i<this.vect_cell_letters.length; i++){
                var rnd_ind = Math.floor(Math.random()*(word_selected.length-0.1));

                if (rnd_ind >= this.info_selected.visible_letters.length || this.info_selected.visible_letters[rnd_ind] == '*'){
                    this.vect_cell_letters[i].letter.setText(word_selected[rnd_ind].toUpperCase());
                    this.vect_cell_letters[i].letter.x = this.vect_cell_letters[i].cell.x - this.vect_cell_letters[i].letter.width/2 - (resolution);
                    this.vect_cell_letters[i].letter.y = this.vect_cell_letters[i].cell.y - this.vect_cell_letters[i].letter.height/2 - (4*resolution);
                    this.vect_cell_letters[i].letter.visible = true;
                    this.vect_cell_letters[i].cell.visible = true;
                }else{
                    this.vect_cell_letters[i].letter.visible = false;
                    this.vect_cell_letters[i].cell.visible = false;
                }

                word_selected = word_selected.substring(0, rnd_ind) + word_selected.substring(rnd_ind+1, word_selected.length);

                if (rnd_ind < this.info_selected.visible_letters.length)
                    this.info_selected.visible_letters = this.info_selected.visible_letters.substring(0, rnd_ind) + this.info_selected.visible_letters.substring(rnd_ind+1, this.info_selected.visible_letters.length);
            }
        }else{
            for (var i=0; i<this.vect_cell_letters.length; i++){
                this.vect_cell_letters[i].letter.visible = false;
                this.vect_cell_letters[i].cell.visible = false;
            }
        }

        (game.add.tween(play.groupCells).to({x: -game.width*2}, 250, Phaser.Easing.Linear.None)).start();
        (game.add.tween(play.groupMenuWord).to({x: 0}, 250, Phaser.Easing.Linear.None, false, 150)).start();


        if (play.numLevel == 1 && play.hand && play.hand.alive){
            play.bg_tuto_noir.visible = false;
            play.bg_tuto.visible = false;
            play.tuto.visible = false;
            play.hand.kill();
            //play.witch_girl.bringToTop();

            (game.add.tween(play.witch_girl).to({x: play.witch_girl.x - (20*resolution), y: 120*resolution}, 250, Phaser.Easing.Quadratic.Out, false, 150)).start();
            game.time.events.add(300, function () {
                play.bg_tuto_noir.loadTexture('bg_tuto2');
                play.bg_tuto_noir.visible = true;
                play.bg_tuto.visible = true;
                play.bg_tuto.x -= 20*resolution;
                play.bg_tuto.y = 70*resolution;
                play.tuto.setText(text.txttuto2);
                play.tuto.x = play.bg_tuto.x + play.bg_tuto.width/2 - play.tuto.width/2 - (5*resolution);
                play.tuto.y = play.bg_tuto.y + play.bg_tuto.height/2 - play.tuto.height/2 - (3*resolution);
                play.tuto.visible = true;
                //play.witch_girl.bringToTop();
            }, this);
        }else{
            (game.add.tween(play.witch_girl).to({x: 45*resolution, y: 100*resolution}, 250, Phaser.Easing.Quadratic.Out, false, 150)).start();

            /*if (this.bg_tuto && this.bg_tuto.txt_unlock) {
             this.bg_tuto.txt_unlock.destroy();
             this.bg_tuto.txt_unlock = null;
             }
             if (this.bg_tuto){
             this.bg_tuto.destroy();
             this.bg_tuto = null;
             }*/
        }
    },

    CloseMenuWord: function(){
        if(play.gameOver || play.pausePlay || play.istimerEndLevel || play.istimerEndLevelAndLose || play.tuto) return;

        if (Music.enableMisic)Music.sounds.play("whoosh");

        if (play.snd_remove > 0) play.snd_remove = 0;

        (game.add.tween(play.groupCells).to({x: 0}, 250, Phaser.Easing.Linear.None, false, 150)).start();
        (game.add.tween(play.groupMenuWord).to({x: game.width*1.5}, 250, Phaser.Easing.Linear.None)).start();
        (game.add.tween(play.witch_girl).to({x: 270*resolution, y: 422*resolution}, 250, Phaser.Easing.Quadratic.Out)).start();

        for (var i=0; i<play.vect_cell_letters.length; i++){
            play.vect_cell_letters[i].letter.visible = false;
        }

        for (i=0; i<this.vect_cell_response.length; i++){
            if (this.vect_cell_response[i].cell) this.vect_cell_response[i].cell.destroy();
            if (this.vect_cell_response[i].letter) this.vect_cell_response[i].letter.destroy();
        }

        this.vect_cell_response = [];
        this.nbr_letters_response = 0;
        this.info_selected.word = '';
        this.info_selected.category = '';
        this.info_selected.question = '';
        this.info_selected.choices = '';
        this.info_selected.visible_letters = '';
    },

    CorrectionWord: function(){
        var nbr_errors = 0;
        for (var i=0; i<this.vect_cell_response.length; i++){
            if (this.vect_cell_response[i].letter.text != this.info_selected.word[i].toUpperCase()){
                nbr_errors++;
                break;
            }
        }

        if (nbr_errors == 0){
            //console.log('correctioooon: RIGHT');
            if (Music.enableMisic) Music.sounds.play('correct');

            for (var ii=0; ii<this.vect_cell_response.length; ii++){
                game.time.events.add(ii*50, (function(){
                    var emitter = game.add.emitter(this.cell.x, this.cell.y, 25);
                    emitter.makeParticles('etoile_particule');
                    emitter.setAlpha(1,0,800,Phaser.Easing.Linear.None);
                    emitter.setScale(1,.75,800,Phaser.Easing.Linear.None);
                    emitter.minParticleSpeed.setTo(-100, -50);
                    emitter.maxParticleSpeed.setTo(100, 100);
                    emitter.start(true, 800, 25, 25);

                    play.groupMenuWord.add(emitter);

                    play.groupMenuWord.bringToTop(this.cell);
                    play.groupMenuWord.bringToTop(this.letter);
                    this.cell.frame = 1;
                    (game.add.tween(this.cell.scale).to({x: this.cell.scale.x+0.2, y: this.cell.scale.y+0.2}, 200, Phaser.Easing.Quadratic.Out).to({x: this.cell.scale.x, y: this.cell.scale.y}, 200, Phaser.Easing.Quadratic.Out)).start();
                    (game.add.tween(this.letter.scale).to({x: this.letter.scale.x+0.2, y: this.letter.scale.y+0.2}, 200, Phaser.Easing.Quadratic.Out).to({x: this.letter.scale.x, y: this.letter.scale.y}, 200, Phaser.Easing.Quadratic.Out)).start();
                }), this.vect_cell_response[ii]);
            }

            //console.log(this.info_selected);
            this.Refresh_grid(play.cell_selected);
            game.time.events.add(500 + (50*this.vect_cell_response.length), this.CloseMenuWord, this);

            sauvegarde[play.numLevel-1].nbr_found++;
            if (sauvegarde[play.numLevel-1].nbr_found >= sauvegarde[play.numLevel-1].nbr_words-2 && this.star1.key == 'star_off'){
                // star 1
                this.star1.loadTexture('star_on');
                this.number_etoiles++;

                play.show_unlock();
            }
            if (sauvegarde[play.numLevel-1].nbr_found >= sauvegarde[play.numLevel-1].nbr_words-1 && this.star2.key == 'star_off'){
                // star 2
                this.star2.loadTexture('star_on');
                this.number_etoiles++;
            }
            if (sauvegarde[play.numLevel-1].nbr_found >= sauvegarde[play.numLevel-1].nbr_words  && this.star3.key == 'star_off'){
                // star 3 and win
                this.star3.loadTexture('star_on');
                this.number_etoiles++;
                this.istimerEndLevel = true;
                this.timerEndLevel = 500 + (50*this.vect_cell_response.length);
            }

            sauvegarde[play.numLevel-1].numetoile = this.number_etoiles;
            save_ecrit();

            play.Witch_Happy_Animation();

        }else{
            //console.log('correctioooon: WRONG');
            if (Music.enableMisic) Music.sounds.play('incorrect');

            for (var ii=0; ii<this.vect_cell_response.length; ii++){
                if (this.vect_cell_response[ii].cell.frame != 1){
                    game.time.events.add(50, (function(){
                        play.groupMenuWord.bringToTop(this.cell);
                        play.groupMenuWord.bringToTop(this.letter);
                        this.cell.frame = 2;
                        (game.add.tween(this.cell.scale).to({x: this.cell.scale.x+0.2, y: this.cell.scale.y+0.2}, 200, Phaser.Easing.Quadratic.Out).to({x: this.cell.scale.x, y: this.cell.scale.y}, 200, Phaser.Easing.Quadratic.Out)).start();
                        (game.add.tween(this.letter.scale).to({x: this.letter.scale.x+0.2, y: this.letter.scale.y+0.2}, 200, Phaser.Easing.Quadratic.Out).to({x: this.letter.scale.x, y: this.letter.scale.y}, 200, Phaser.Easing.Quadratic.Out)).start();

                        game.time.events.add(400, (function(){
                            this.cell.frame = 0;
                        }), this);
                    }), this.vect_cell_response[ii]);
                }
            }
            play.Witch_Sad_Animation();
        }

    },

    Refresh_grid: function(cell){
        //console.log('refresh');
        var first_ind = 0;
        var last_ind = 0;

        if (cell.direction_vertical == 0){ // horizontal
            if (cell.ind_j >= 0){
                for (var j=cell.ind_j;j>=0;j--){
                    if (this.mat_sprites[cell.ind_i][j].bg_cell){
                        if (!this.mat_sprites[cell.ind_i][j].txt_letter.visible){
                            this.mat_sprites[cell.ind_i][j].txt_letter.visible = true;
                            this.mat_player[cell.ind_i][j] = this.mat_sprites[cell.ind_i][j].txt_letter.text;
                            save_word(this.mat_player[cell.ind_i][j], play.numLevel-1, cell.ind_i, j);
                            this.nbr_letters_found++;
                        }
                    }else{
                        first_ind = j+1;
                        break;
                    }
                }
            }

            if (cell.ind_j+1 < play.rows){
                for (var jj=cell.ind_j+1;jj<play.rows;jj++){
                    if (this.mat_sprites[cell.ind_i][jj].bg_cell){
                        if (!this.mat_sprites[cell.ind_i][jj].txt_letter.visible){
                            this.mat_sprites[cell.ind_i][jj].txt_letter.visible = true;
                            this.mat_player[cell.ind_i][jj] = this.mat_sprites[cell.ind_i][jj].txt_letter.text;
                            save_word(this.mat_player[cell.ind_i][jj], play.numLevel-1, cell.ind_i, jj);
                            this.nbr_letters_found++;
                        }
                    }else{
                        last_ind = jj-1;
                        break;
                    }
                }
            }
        }else{ // vertical
            if (cell.ind_i >= 0){
                for (var i=cell.ind_i;i>=0;i--){
                    if (this.mat_sprites[i][cell.ind_j].bg_cell){
                        if (!this.mat_sprites[i][cell.ind_j].txt_letter.visible){
                            this.mat_sprites[i][cell.ind_j].txt_letter.visible = true;
                            this.mat_player[i][cell.ind_j] = this.mat_sprites[i][cell.ind_j].txt_letter.text;
                            save_word(this.mat_player[i][cell.ind_j], play.numLevel-1, i, cell.ind_j);
                            this.nbr_letters_found++;
                        }
                    }else{
                        first_ind = i+1;
                        break;
                    }
                }
            }

            if (cell.ind_i +1 < play.cols){
                for (var ii=cell.ind_i+1;ii<play.cols;ii++){
                    if (this.mat_sprites[ii][cell.ind_j].bg_cell){
                        if (!this.mat_sprites[ii][cell.ind_j].txt_letter.visible){
                            this.mat_sprites[ii][cell.ind_j].txt_letter.visible = true;
                            this.mat_player[ii][cell.ind_j] = this.mat_sprites[ii][cell.ind_j].txt_letter.text;
                            save_word(this.mat_player[ii][cell.ind_j], play.numLevel-1, ii, cell.ind_j);
                            this.nbr_letters_found++;
                        }
                    }else{
                        last_ind = ii-1;
                        break;
                    }
                }
            }
        }
    },

    ShowLetter: function(){
        if(play.gameOver || play.pausePlay || play.istimerEndLevel || play.istimerEndLevelAndLose || play.tuto) return;
        if (play.nbr_hints <= 0) return;

        var nbr_cell_visible = 0;
        for (var i=0; i<this.vect_cell_response.length; i++){
            if (this.vect_cell_response[i].letter.visible)
                nbr_cell_visible++;
        }

        if (nbr_cell_visible >= this.vect_cell_response.length) return;

        //console.log('shooow');
        var rnd_ind = Math.floor(Math.random()*(this.vect_cell_response.length-0.1));
        while (this.vect_cell_response[rnd_ind].letter.visible){
            rnd_ind = Math.floor(Math.random()*(this.vect_cell_response.length-0.1));
        }

        for (var x=0; x<this.vect_cell_letters.length; x++){
            if (this.vect_cell_letters[x].letter.visible && this.vect_cell_letters[x].letter.text == this.info_selected.word[rnd_ind]){
                play.vect_cell_response[rnd_ind].letter.setText(this.vect_cell_letters[x].letter.text);
                play.vect_cell_response[rnd_ind].letter.x = play.vect_cell_response[rnd_ind].cell.x - play.vect_cell_response[rnd_ind].letter.width/2 - (0.5*resolution);
                play.vect_cell_response[rnd_ind].letter.y = play.vect_cell_response[rnd_ind].cell.y - play.vect_cell_response[rnd_ind].letter.height/2 - (3.5*resolution);
                play.vect_cell_response[rnd_ind].cell.frame = 1;
                play.vect_cell_response[rnd_ind].cell.ind_question = this.vect_cell_letters[x].cell.ind;
                play.vect_cell_response[rnd_ind].letter.visible = true;
                //console.log(play.vect_cell_response[rnd_ind]);
                this.vect_cell_letters[x].letter.visible = false;
                this.vect_cell_letters[x].cell.visible = false;
                play.nbr_letters_response++;

                if (Music.enableMisic) Music.sounds.play('powerup');
                var emitter = game.add.emitter(play.vect_cell_response[rnd_ind].cell.x, play.vect_cell_response[rnd_ind].cell.y - play.vect_cell_response[rnd_ind].cell.height/4, 25);
                emitter.makeParticles('etoile_particule');
                emitter.setAlpha(1,0,1500,Phaser.Easing.Linear.None);
                emitter.setScale(1,.5,1500,Phaser.Easing.Linear.None);
                emitter.minParticleSpeed.setTo(-100, -25);
                emitter.maxParticleSpeed.setTo(100, 100);
                emitter.start(true, 1500, 25, 25);

                break;
            }
        }

        if (play.cell_selected.direction_vertical == 0){ // horizontal
            if (play.mat_sprites[play.cell_selected.ind_i][play.cell_selected.first_j+rnd_ind].bg_cell){
                if (!play.mat_sprites[play.cell_selected.ind_i][play.cell_selected.first_j+rnd_ind].txt_letter.visible){
                    play.mat_sprites[play.cell_selected.ind_i][play.cell_selected.first_j+rnd_ind].txt_letter.visible = true;
                    play.mat_player[play.cell_selected.ind_i][play.cell_selected.first_j+rnd_ind] = play.mat_sprites[play.cell_selected.ind_i][play.cell_selected.first_j+rnd_ind].txt_letter.text;
                    save_word(play.mat_player[play.cell_selected.ind_i][play.cell_selected.first_j+rnd_ind], play.numLevel-1, play.cell_selected.ind_i, play.cell_selected.first_j+rnd_ind);
                    play.nbr_letters_found++;
                }
            }
        }else if (play.cell_selected.direction_vertical == 1){ // vertical
            if (play.mat_sprites[play.cell_selected.first_i+rnd_ind][play.cell_selected.ind_j].bg_cell){
                if (!play.mat_sprites[play.cell_selected.first_i+rnd_ind][play.cell_selected.ind_j].txt_letter.visible){
                    play.mat_sprites[play.cell_selected.first_i+rnd_ind][play.cell_selected.ind_j].txt_letter.visible = true;
                    play.mat_player[play.cell_selected.first_i+rnd_ind][play.cell_selected.ind_j] = play.mat_sprites[play.cell_selected.first_i+rnd_ind][play.cell_selected.ind_j].txt_letter.text;
                    save_word(play.mat_player[play.cell_selected.first_i+rnd_ind][play.cell_selected.ind_j], play.numLevel-1, play.cell_selected.first_i+rnd_ind, play.cell_selected.ind_j);
                    play.nbr_letters_found++;
                }
            }
        }

        play.nbr_hints--;
        Save_setItem("WitchCrossward_hints", play.nbr_hints);
        play.txt_nbr_hints.setText(text.txtHint+this.nbr_hints);
        //play.txt_nbr_hints.updateText();
        play.txt_nbr_hints.x = 263*resolution - play.txt_nbr_hints.width/2;

        if (play.nbr_letters_response >= play.vect_cell_response.length)
            play.CorrectionWord();

    },

    DeleteLetter: function(){
        if(play.gameOver || play.pausePlay || play.istimerEndLevel || play.istimerEndLevelAndLose || play.tuto) return;
        if (play.nbr_hints <= 0) return;

        var nbr_cell_visible = 0;
        var nbr_cell_invisible = 0;
        for (var i=0; i<this.vect_cell_response.length; i++){
            if (this.vect_cell_response[i].letter.visible)
                nbr_cell_visible++;
            else
                nbr_cell_invisible++
        }

        if (nbr_cell_visible >= this.vect_cell_response.length) return;

        var nbr_letter_visible = 0;
        for (var j=0; j<this.vect_cell_letters.length; j++){
            if (this.vect_cell_letters[j].letter.visible)
                nbr_letter_visible++;
        }

        if (nbr_cell_invisible >= nbr_letter_visible) return;

        //console.log('delete');
        var rnd_ind = Math.floor(Math.random()*(this.vect_cell_letters.length-0.1));
        var random_again = true;
        var compteur_while = 0;
        while (random_again || !this.vect_cell_letters[rnd_ind].cell.visible){
            rnd_ind = Math.floor(Math.random()*(this.vect_cell_letters.length-0.1));

            for (var x=0; x<this.info_selected.word.length; x++){
                random_again = false;

                if (this.vect_cell_letters[rnd_ind].letter.visible && this.vect_cell_letters[rnd_ind].letter.text == this.info_selected.word[x]){
                    random_again = true;
                    break;
                }
            }

            compteur_while++;
            if (compteur_while >= 3000) {
                this.creer_text_score({x: game.width/2, y: game.height/2, txt_created: false}, text.txtNoDelete, 15*resolution);
                return;
            }
        }

        if (this.vect_cell_letters[rnd_ind].cell.visible){
            play.vect_cell_letters[rnd_ind].cell.visible = false;
            play.vect_cell_letters[rnd_ind].letter.visible = false;

            if (Music.enableMisic) Music.sounds.play('powerup');
            var emitter = game.add.emitter(play.vect_cell_letters[rnd_ind].cell.x, play.vect_cell_letters[rnd_ind].cell.y - play.vect_cell_letters[rnd_ind].cell.height/4, 25);
            emitter.makeParticles('etoile_particule');
            emitter.setAlpha(1,0,1500,Phaser.Easing.Linear.None);
            emitter.setScale(1,.5,1500,Phaser.Easing.Linear.None);
            emitter.minParticleSpeed.setTo(-100, -25);
            emitter.maxParticleSpeed.setTo(100, 100);
            emitter.start(true, 1500, 25, 25);

            for (var s=0; s<words[play.info_selected.ind].choices.length; s++){
                if (words[play.info_selected.ind].choices[s].toUpperCase() == play.vect_cell_letters[rnd_ind].letter.text){
                    words[play.info_selected.ind].choices = words[play.info_selected.ind].choices.substring(0, s) + words[play.info_selected.ind].choices.substring(s+1, words[play.info_selected.ind].choices.length);
                    break;
                }
            }
        }

        play.nbr_hints--;
        Save_setItem("WitchCrossward_hints", play.nbr_hints);
        play.txt_nbr_hints.setText(text.txtHint+this.nbr_hints);
        //play.txt_nbr_hints.updateText();
        play.txt_nbr_hints.x = 263*resolution - play.txt_nbr_hints.width/2;
    },

    Time_Update: function(){
        //if (this.nbr_letters_found >= this.nbr_letters_level) return;
        if (play.tuto) return;
        if (sauvegarde[play.numLevel-1].nbr_found >= sauvegarde[play.numLevel-1].nbr_words) return;

        if (!this.objectives_finished) {
            if (this.bonus_timer >= 0) {
                this.bonus_timer -= this.game.time.elapsed
            } else if (this.bonus_time > 0) {
                if (this.bonus_time > 1) {
                    if (this.bonus_time%60 == 0) {
                        this.minutes--;
                        this.secondss = 59;
                        this.txt_time.setText(this.minutes + ":" + this.secondss)
                    } else {
                        this.secondss--;
                        if (this.secondss < 10) {
                            this.txt_time.setText(this.minutes + ":0" + this.secondss)
                        } else {
                            this.txt_time.setText(this.minutes + ":" + this.secondss)
                        }
                    }
                    this.bonus_time--;
                    this.bonus_timer = 1e3;
                } else {
                    this.bonus_time--;
                    this.txt_time.setText("0:00");
                }
            }
        }
    },

    Witch_Happy_Animation: function(){
        //if (play.witch_girl.y != 425*resolution) return;

        if (Music.enableMisic) Music.sounds.play('witch_laugh');
        this.witch_girl.animations.play('happy', 40, false, false);
        /*((game.add.tween(this.witch_girl).to({y: this.witch_girl.y+(10*resolution)}, 450, Phaser.Easing.Quadratic.In)).start()).onComplete.add((function(){
         ((game.add.tween(this.witch_girl).to({y: this.witch_girl.y-(60*resolution)}, 750, Phaser.Easing.Quadratic.Out)).start()).onComplete.add((function(){
         (game.add.tween(this.witch_girl).to({y: this.witch_girl.y+(50*resolution)}, 800, Phaser.Easing.Quadratic.InOut)).start();
         }), this);
         }), this); */
    },

    Witch_Sad_Animation: function(){
        if (play.witch_girl.x != 45*resolution) return;

        if (Music.enableMisic) Music.sounds.play('witch_sad');
        this.witch_girl.animations.play('sad', 33, false, false);
        //(game.add.tween(play.witch_girl).to({x: play.witch_girl.x - (3*resolution), y: play.witch_girl.y + 10*resolution}, 700, Phaser.Easing.Quadratic.In, false).to({x: play.witch_girl.x, y: play.witch_girl.y}, 700, Phaser.Easing.Quadratic.Out, false, 1300)).start();
        ((game.add.tween(play.witch_girl).to({x: -game.width*2}, 800, Phaser.Easing.Back.In, false, 1000)).start()).onComplete.add((function(){
            play.witch_girl.x = game.width*2;
            (game.add.tween(play.witch_girl).to({x: 45*resolution}, 500, Phaser.Easing.Quadratic.Out, false, 500)).start()
        }), this);
    },

    init_tuto: function(){
        if (play.numLevel == 1 && play.mat_player[6][8] == "*"){
            this.bg_tuto_noir = game.add.sprite(0, 0, "bg_tuto1");
            this.bg_tuto_noir.visible = false;
            this.bg_tuto = game.add.sprite(55*resolution, 370 * resolution, "sprites2");
            this.bg_tuto.frameName = "bgTuto" + resolution + ".png";
            this.bg_tuto.visible = false;
            //this.tuto = game.add.bitmapText(this.bg_tuto.x + 7 * resolution, this.bg_tuto.y + 40 * resolution, "fontc", text.txttuto1, 21 * resolution);
            this.tuto = game.add.text(this.bg_tuto.x + 7 * resolution, this.bg_tuto.y + 35 * resolution, text.txttuto1, {font: (15 * resolution) + langFont, align: 'center', fill: "#a46859", stroke: "#000000", strokeThickness: 0 * resolution});
            this.tuto.visible = false;
            //this.tuto.updateText();
            this.tuto.x = this.bg_tuto.x + this.bg_tuto.width/2 - this.tuto.width/2 - (5*resolution);
            this.tuto.y = this.bg_tuto.y + this.bg_tuto.height/2 - this.tuto.height/2 - (3*resolution);
            this.tuto.align = "center";
            this.hand = game.add.sprite(30*resolution, 215*resolution, 'sprites2', 'hand'+resolution+'.png');
            this.hand.frameName = "hand" + resolution + ".png";
            this.hand.visible = false;
            game.time.events.add(400, function () {
                this.bg_tuto_noir.visible = true;
                this.bg_tuto.visible = true;
                this.tuto.visible = true;
                this.hand.visible = true;
                (game.add.tween(this.hand).to({y: 320*resolution}, 700, Phaser.Easing.Quadratic.None).to({y: 215*resolution}, 700, Phaser.Easing.Quadratic.None)).loop().start();
                this.witch_girl.bringToTop();
            }, this);
        }
    },

    show_unlock: function(){
        game.time.events.add(1500, (function(){
            this.bg_noire.visible = true;
            this.pausePlay = true;

            if (play.bonus_time > 0) play.nbr_hints++;
            if (play.bonus_time > 30) play.nbr_hints++;
            if (play.bonus_time > 60) play.nbr_hints++;
            Save_setItem("WitchCrossward_hints", play.nbr_hints);

            if (this.numLevel > level && this.numLevel < nombre_levels) {
                level = this.numLevel;
                Save_setItem("WitchCrossward_level", level);

                new_level = true;
            }

            play.Fin_level(false);

            this.group_unlock = game.add.group();
            this.bg_unlock = game.add.sprite(game.width/2, game.height/2, "sprites2", "bg_question"+resolution+'.png');
            this.bg_unlock.anchor.setTo(.5,.5);
            this.bg_unlock.alive = true;
            this.txt_unlock = game.add.text(0, 0, text.txtunlock, {font: (18 * resolution) + langFont, align: 'center', fill: "#a46859", stroke: "#000000", strokeThickness: 0 * resolution});
            this.txt_unlock.x = this.bg_unlock.x - this.txt_unlock.width/2;
            this.txt_unlock.y = this.bg_unlock.y - this.txt_unlock.height/2 - (5*resolution);
            this.txt_unlock.alive = true;
            this.bnt_next = new Bouton(this.game, this.bg_unlock.x - (60*resolution), this.bg_unlock.y + this.bg_unlock.height/2 + 20 * resolution, "sprites2", (function(){
                play.InitialiseFade("levels");
            }), this);
            this.bnt_next.frameName = "bnt_next" + resolution + ".png";
            this.bnt_next.alive = true;
            this.bnt_continue = new Bouton(this.game, this.bg_unlock.x + (60*resolution), this.bg_unlock.y + this.bg_unlock.height/2 + 20 * resolution, "sprites2", (function(){
                ((game.add.tween(this.group_unlock).to({y: -50 * resolution}, 350, Phaser.Easing.Quadratic.Out, false, 100).to({y: 400 * resolution}, 300, Phaser.Easing.Quadratic.Out, true)).start()).onComplete.add(function () {
                    this.bg_noire.visible = false;
                    this.pausePlay = false;
                    (game.add.tween(play.witch_girl).to({x: 270*resolution, y: 422*resolution}, 250, Phaser.Easing.Quadratic.Out)).start();
                }, this);
            }), this);
            this.bnt_continue.frameName = "bnt_continue" + resolution + ".png";
            this.bnt_continue.alive = true;

            this.group_unlock.add(this.bg_unlock);
            this.group_unlock.add(this.txt_unlock);
            this.group_unlock.add(this.bnt_next);
            this.group_unlock.add(this.bnt_continue);

            this.group_unlock.y = 400*resolution;

            (game.add.tween(this.group_unlock).to({y: -50 * resolution}, 350, Phaser.Easing.Quadratic.Out, true, 100).to({y: -35 * resolution}, 200, Phaser.Easing.Quadratic.Out, true, 70)).start();
            (game.add.tween(play.witch_girl).to({x: 45*resolution, y: 100*resolution}, 250, Phaser.Easing.Quadratic.Out, false, 70)).start();

            game.world.bringToTop(this.bg_noire);
            game.world.bringToTop(this.group_unlock);
            game.world.bringToTop(this.witch_girl);

            /*this.bg_tuto = game.add.sprite(55*resolution, 370 * resolution, "sprites2");
             this.bg_tuto.frameName = "bgTuto" + resolution + ".png";
             this.bg_tuto.txt_unlock = game.add.text(this.bg_tuto.x + 7 * resolution, this.bg_tuto.y + 35 * resolution, text.txtunlock, {font: (13 * resolution) + langFont, align: 'center', fill: "#a46859", stroke: "#000000", strokeThickness: 0 * resolution});
             this.bg_tuto.txt_unlock.x = this.bg_tuto.x + this.bg_tuto.width/2 - this.bg_tuto.txt_unlock.width/2 - (5*resolution);
             this.bg_tuto.txt_unlock.y = this.bg_tuto.y + this.bg_tuto.height/2 - this.bg_tuto.txt_unlock.height/2 - (3*resolution);

             var emitter = game.add.emitter(this.bg_tuto.x + this.bg_tuto.width/2 - (10*resolution), this.bg_tuto.y + this.bg_tuto.height/4, 50);
             emitter.makeParticles('etoile_particule');
             emitter.setAlpha(1,0,1500,Phaser.Easing.Linear.None);
             emitter.minParticleSpeed.setTo(-200, -50);
             emitter.maxParticleSpeed.setTo(200, 150);
             emitter.start(true, 1500, 50, 50);

             game.time.events.add(5000, (function(){
             if (this.bg_tuto && this.bg_tuto.txt_unlock) {
             this.bg_tuto.txt_unlock.destroy();
             this.bg_tuto.txt_unlock = null;
             }
             if (this.bg_tuto){
             this.bg_tuto.destroy();
             this.bg_tuto = null;
             }
             }), this);*/
        }), this);
    },



    GenerateLevels: function(i){
        //console.log('generateeeeeeeeeeeeeeeee');
        str_mat = Save_getItem("WitchCrossward_mat", null);
        str_mat_player = Save_getItem("WitchCrossward_mat_player", null);

        if (str_mat == null) str_mat = '';
        if (str_mat_player == null) str_mat_player = '';

        this.rows = 20;
        this.cols = 20;
        //this.all_words = words;

        var str_words = Save_getItem("WitchCrossward_words", '');

        load_words(str_words);
        this.all_words = all_words;

        /*for (var xx = 0; xx<words.length; xx++){
         this.all_words.push(
         {   category: words[xx].category,
         question: words[xx].question,
         response: words[xx].response,
         choices: words[xx].choices
         }
         );
         }*/

        this.generation_process(i);

        //console.log(this.all_words);
        save_words(this.all_words);
    },

    generation_process: function(i){
        this.best_mat = {mat: [], score:-1};
        this.score_mat = 0;

        this.choose_words(i);

        if (i > 0){
            //console.log(this.vect_words);
            var nbr_iter = 0;
            while (nbr_iter < 200){
                //console.log(this.best_mat.score);
                this.algo_generation();
                nbr_iter++;
            }
        }else{
            this.mat_grid = [];
            for (var ii = 0; ii<this.rows; ii++){
                this.mat_grid[ii] = [];
                for (var jj=0; jj<this.cols; jj++){
                    this.mat_grid[ii][jj] = '';
                }
            }
            this.mat_grid[4][10] = 'N';
            this.mat_grid[4][11] = 'o';
            this.mat_grid[4][12] = 'r';
            this.mat_grid[4][13] = 'm';
            this.mat_grid[4][14] = 'a';
            this.mat_grid[4][15] = 'l';

            this.mat_grid[6][8] = 'L';
            this.mat_grid[7][8] = 'i';
            this.mat_grid[8][8] = 'o';
            this.mat_grid[9][8] = 'n';

            this.mat_grid[7][7] = 'D';
            this.mat_grid[7][8] = 'i';
            this.mat_grid[7][9] = 'n';
            this.mat_grid[7][10] = 'n';
            this.mat_grid[7][11] = 'e';
            this.mat_grid[7][12] = 'r';

            this.mat_grid[3][11] = 'C';
            this.mat_grid[4][11] = 'o';
            this.mat_grid[5][11] = 'f';
            this.mat_grid[6][11] = 'f';
            this.mat_grid[7][11] = 'e';
            this.mat_grid[8][11] = 'e';

            this.best_mat.mat = this.mat_grid;
            this.best_mat.score = 4;
        }
        //console.log('/// BEST MATRICE /// == ' + this.best_mat.score);
        sauvegarde[i].nbr_words = this.best_mat.score;
        //console.table(this.best_mat.mat);
        save_matrice(this.best_mat.mat);

        //this.pourcentage = Math.floor(((i+1)*100)/30);
        // this.txt_generating.setText(text.txtgenerate+'\n'+this.pourcentage+'%');
        //this.txt_generating.x = game.width/2 - this.txt_generating.width/2;

        /*if (i<nombre_levels-1){
         game.time.events.add(10, (function(){
         i++;
         //console.log(i);
         this.generation_process(i);
         }), this);
         }else{*/
        save_ecrit();
        //  this.game.state.start("menu");
        //}
    },

    choose_words:function(num_level){
        this.vect_words = [];
        // number words to put in the grid
        if (num_level == 0)
            var nbr_words = 4;
        else if (num_level <= 5)
            var nbr_words = 5;
        else if (num_level <= 10)
            var nbr_words = 10;
        else if (num_level < 20)
            var nbr_words = 10;
        else if (num_level <= nombre_levels)
            var nbr_words = 15;
        //nbr_words = 25;
        var v = 0;
        while (v<nbr_words){
            if (num_level == 0){
                var id_word = v;
            }else{
                var id_word = Math.round(Math.random()*(this.all_words.length-1)); // randomly select a word from all words
            }

            if (this.all_words[id_word].category != '*'){
                this.vect_words.push({word: this.all_words[id_word].response, question: this.all_words[id_word].question, category: this.all_words[id_word].category, choices: this.all_words[id_word].choices,  position:'-1', isVertical:'-1'});
                this.all_words[id_word].category = '*';
                this.all_words[id_word].response = '*';
                this.all_words[id_word].question = '*';
                this.all_words[id_word].choices = '*';
                //console.log(words[id_word]);
                v++;
            }
        }
    },

    algo_generation:function(){
        this.sort_longest_word(this.vect_words);

        this.score_mat = 0;

        this.mat_grid = [];
        for (var i = 0; i<this.rows; i++){
            this.mat_grid[i] = [];
            for (var j=0; j<this.cols; j++){
                this.mat_grid[i][j] = '';
            }
        }

        this.put_first_word();

        for (var it=0; it<100; it++){
            this.put_left_words();
        }

        if (this.best_mat.score < this.score_mat){
            this.best_mat.mat = this.mat_grid;
            this.best_mat.score = this.score_mat;
        }
    },

    sort_longest_word:function(vect){
        var vect_sort = [];
        for (var w=0; w<vect.length; w++){
            var longest_word = this.vect_words[w].word;
            var longest_word_index = w;
            for (var i=0; i < vect.length; i++){
                if (longest_word.length < vect[i].word.length){
                    longest_word = vect[i].word;
                    longest_word_index = i;
                }
            }
            vect_sort.push({word: longest_word, question: this.vect_words[longest_word_index].question, category: this.vect_words[longest_word_index].category, choices: this.vect_words[longest_word_index].choices, position:'-1', isVertical:'-1'});
            vect[longest_word_index].word = '';
        }

        this.vect_words = vect_sort; // vect sorted from longest to smallest word
    },

    insert_word_grid:function(word_obj){
        if (this.score_mat != 0){
            var nbr_lettre_commun = 0;
            if (word_obj.isVertical == 0){
                nbr_lettre_commun = 0;
                for (var j=word_obj.position.j; j<word_obj.position.j+word_obj.word.length; j++){
                    if (this.mat_grid[word_obj.position.i][j] != ''){
                        nbr_lettre_commun++;

                        if (nbr_lettre_commun > 1){
                            j = word_obj.position.j+word_obj.word.length+1;
                            word_obj.position = '-1';
                            word_obj.isVertical = '-1';
                        }
                    }
                }
            }else if (word_obj.isVertical == 1){
                nbr_lettre_commun = 0;
                for (var i=word_obj.position.i; i<word_obj.position.i+word_obj.word.length; i++){
                    if (this.mat_grid[i][word_obj.position.j] != ''){
                        nbr_lettre_commun++;

                        if (nbr_lettre_commun > 1){
                            i = word_obj.position.i+word_obj.word.length+1;
                            word_obj.position = '-1';
                            word_obj.isVertical = '-1';
                        }
                    }
                }
            }
        }
        if (word_obj.position != '-1'){
            for (var l=0; l<word_obj.word.length; l++){
                this.mat_grid[word_obj.position.i][word_obj.position.j] = word_obj.word[l];

                if (word_obj.isVertical == 0)
                    word_obj.position.j++;
                else
                    word_obj.position.i++;
            }
            this.score_mat++;
        }
    },

    put_first_word:function(){
        // Mettre le premier mot dans la grille
        while (this.vect_words[0].position == "-1"){
            var pos_debut = {i: Math.round(Math.random()*(this.cols-1)), j: Math.round(Math.random()*(this.rows-1))};
            var isvert = Math.round(Math.random()); // 0 = vetical // 1 = horizontal

            if (isvert == 0){ // positionner le mot verticalement
                if (pos_debut.j+this.vect_words[0].word.length < this.cols){
                    this.vect_words[0].position = {i: pos_debut.i, j: pos_debut.j};
                    this.vect_words[0].isVertical = isvert;
                    this.insert_word_grid(this.vect_words[0]);
                }
            }else if (isvert == 1){ // positionner le mot horizontalement
                if (pos_debut.i+this.vect_words[0].word.length < this.rows){
                    this.vect_words[0].position = {i: pos_debut.i, j: pos_debut.j};
                    this.vect_words[0].isVertical = isvert;
                    this.insert_word_grid(this.vect_words[0]);
                }
            }
        }
    },

    put_left_words:function(){
        // Mettre les autres mots
        for (var w=0; w < this.vect_words.length; w++){
            if (this.vect_words[w].position == '-1'){
                for (var i=0; i<this.cols; i++){
                    for (var j=0; j<this.rows; j++){
                        if (this.mat_grid[i][j] != ''){
                            for (var l=0; l<this.vect_words[w].word.length;l++){
                                if (this.vect_words[w].word[l] == this.mat_grid[i][j]){
                                    var nbr_lettre_commun_avant = 0;
                                    var nbr_lettre_commun_apres = 0;
                                    if ((j - l + 1) > 0 && (j - l + this.vect_words[w].word.length - 1) < this.rows && ((j-l-1 >= 0 && this.mat_grid[i][j-l-1] == '' && (j-l+this.vect_words[w].word.length) < this.rows && this.mat_grid[i][j-l+this.vect_words[w].word.length] == '') || (j-l-1 < 0 && (j-l+this.vect_words[w].word.length) < this.rows && this.mat_grid[i][j-l+this.vect_words[w].word.length] == ''))){

                                        nbr_lettre_commun_avant = 0;
                                        nbr_lettre_commun_apres = 0;
                                        for (var m=j-l; m<(j-l)+this.vect_words[w].word.length; m++){
                                            if (m >= 0 && m < this.rows && i-1 >= 0){
                                                if (this.mat_grid[i-1][m] != ''){
                                                    nbr_lettre_commun_avant++;
                                                }
                                            }

                                            if (m >= 0 && m < this.rows && i+1 < this.rows){
                                                if (this.mat_grid[i+1][m] != ''){
                                                    nbr_lettre_commun_apres++;
                                                }
                                            }
                                        }

                                        if (nbr_lettre_commun_avant <= 1 && nbr_lettre_commun_apres <= 1){
                                            this.vect_words[w].position = {i: i, j: j-l};
                                            this.vect_words[w].isVertical = 0;
                                            l = this.vect_words[w].word.length+1;
                                            i = this.cols + 1;
                                            j = this.rows + 1;
                                        }
                                    }
                                    else if ((i - l + 1) > 0 && (i - l + this.vect_words[w].word.length - 1) < this.cols && ((i-l-1>0 && this.mat_grid[i-l-1][j] == '' && (i-l+this.vect_words[w].word.length) < this.cols && this.mat_grid[i-l+this.vect_words[w].word.length][j] == '') || (i-l-1 < 0 && (i-l+this.vect_words[w].word.length) < this.cols && this.mat_grid[i-l+this.vect_words[w].word.length][j] == ''))){
                                        nbr_lettre_commun_avant = 0;
                                        nbr_lettre_commun_apres = 0;
                                        for (var n=i-l; n<(i-l)+this.vect_words[w].word.length; n++){
                                            if (n >= 0 && n < this.cols && j-1 >= 0){
                                                if (this.mat_grid[n][j-1] != ''){
                                                    nbr_lettre_commun_avant++;
                                                }
                                            }

                                            if (n >= 0 && n < this.cols && j+1 < this.cols){
                                                if (this.mat_grid[n][j+1] != ''){
                                                    nbr_lettre_commun_apres++;
                                                }
                                            }
                                        }

                                        if (nbr_lettre_commun_avant <= 1 && nbr_lettre_commun_apres <= 1){
                                            this.vect_words[w].position = {i: i-l, j: j};
                                            this.vect_words[w].isVertical = 1;
                                            l = this.vect_words[w].word.length+1;
                                            i = this.cols + 1;
                                            j = this.rows + 1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (this.vect_words[w].position != '-1')
                    this.insert_word_grid(this.vect_words[w]);

            }
        }
    }
};