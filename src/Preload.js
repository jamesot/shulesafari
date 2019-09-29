WitchCrossward.Preload = function (game) {
    this.all_words = null;
    this.vect_words = null;
    this.mat_grid = null;
    this.score_mat = null;
    this.best_mat = null;
    this.rows = null;
    this.cols = null;
    //this.pourcentage = null;
    //this.txt_generating = null;
    //this.nbr_words_used = null;
};
WitchCrossward.Preload.prototype = {
    preload: function () {
        game.add.sprite(0, 0, "bgPreload");

        //var progressBar_bg = game.add.image(30 * resolution, 440 * resolution, "sprites2", 'preload_bar_bg'+resolution+'.png');
        var progressBar = game.add.image(33 * resolution, 205.7 * resolution, "preloadSprite01");
        //progressBar.alpha = 0.5;
        game.load.setPreloadSprite(progressBar);
        var txt_progress = game.add.text(135*resolution, 170*resolution, '', {font: (22 * resolution) + langFont2, align: 'center', fill: "#ffffff", stroke: "#000000", strokeThickness: 3 * resolution});
        //game.add.bitmapText(135 * resolution, 434 * resolution, "fontc", "", 26 * resolution);
        game.load.onFileComplete.add(function (progress) {
            txt_progress.setText(progress + "%");
            txt_progress.x = game.width/2 - txt_progress.width/2;
        }, this);

        game.load.image("rotate", "assets/rotate" + resolution + ".png");
        game.load.spritesheet('levelbnt', 'assets/levelbnt'+resolution+'.png', 40*resolution ,43*resolution);
        //game.load.spritesheet("obj", "assets/obj" + resolution + ".png", 35 * resolution, 35 * resolution);
        //game.load.spritesheet("tiles_bg", "assets/tiles_bg" + resolution + ".png", 50 * resolution, 43 * resolution);
        //game.load.spritesheet("rock_explosion", "assets/rock_explosion" + resolution + ".png", 75 * resolution, 67.5 * resolution);
        //game.load.spritesheet("bomb_explosion", "assets/bomb_explosion" + resolution + ".png", 147 * resolution, 147 * resolution);
        //game.load.spritesheet("virus_explosion", "assets/virus_explosion" + resolution + ".png", 75 * resolution, 79 * resolution);
        game.load.image("bgPlay", "assets/bgPlay" + resolution + ".png");
        //game.load.tilemap("map", "assets/levelsGame" + resolution + ".json", null, Phaser.Tilemap.TILED_JSON);
        //game.load.image("tiles", "assets/obj" + resolution + ".png");
        game.load.image("bgnoire", "assets/bgnoire" + resolution + ".png");
        //game.load.image("bg_tuto2", "assets/bg_tuto2" + resolution + ".png");
        //game.load.image("bg_tuto4", "assets/bg_tuto4" + resolution + ".png");
        //game.load.image("bg_tuto5", "assets/bg_tuto5" + resolution + ".png");
        //game.load.image("timer_bar", "assets/timer_bar" + resolution + ".png");
        game.load.image("bg_tuto1", "assets/bg_tuto1" + resolution + ".png");
        game.load.image("bg_tuto2", "assets/bg_tuto2" + resolution + ".png");
        //game.load.image("bg_tuto3", "assets/bg_tuto3" + resolution + ".png");
        game.load.image("credits", "assets/credits" + resolution + ".png");
        //game.load.image("link", "assets/link" + resolution + ".png");
        //game.load.image("unknown", "assets/unknown" + resolution + ".png");
        game.load.image("etoile_particule", "assets/etoile_particule" + resolution + ".png");
        game.load.image('map1', 'assets/map1-new'+resolution+'.png');
        game.load.image('map2', 'assets/map2-new'+resolution+'.png');
        //game.load.image('exit_bnt', 'assets/exit_bnt'+resolution+'.png');
        game.load.image('star_off', 'assets/star_off'+resolution+'.png');
        game.load.image('star_on', 'assets/star_on'+resolution+'.png');

        //game.load.image('bg_question', 'assets/bg_question'+resolution+'.png');
        //game.load.image('bg_menu_word', 'assets/bg_menu_word'+resolution+'.png');
        //game.load.image('bnt_show', 'assets/bnt_show'+resolution+'.png');
        //game.load.image('bnt_delete', 'assets/bnt_delete'+resolution+'.png');

        game.load.image('light_snow', 'assets/light_snow'+resolution+'.png');

        game.load.spritesheet('container_letter', 'assets/container_letter'+resolution+'.png', 37.5*resolution, 42.5*resolution);
        //game.load.spritesheet('container_letter', 'assets/container_letter'+resolution+'.png', 40*resolution, 40*resolution);

        //game.load.spritesheet('squares', 'assets/squares'+resolution+'.png', 20*resolution, 20*resolution);
        game.load.spritesheet('squares', 'assets/squares'+resolution+'.png', 20*resolution, 22.5*resolution);

        //game.load.spritesheet('witch_normal', 'assets/witch_idle'+resolution+'.png', 165*resolution, 181*resolution);
        game.load.spritesheet('witch_idle', 'assets/girl_idle'+resolution+'.png', 90*resolution, 115*resolution);
        game.load.spritesheet('witch_happy', 'assets/girl_happy'+resolution+'.png', 90*resolution, 115*resolution);
        game.load.spritesheet('witch_sad', 'assets/girl_sad'+resolution+'.png', 90*resolution, 115*resolution);
        game.load.spritesheet('witch_veryhappy', 'assets/girl_veryhappy'+resolution+'.png', 90*resolution, 115*resolution);

        game.load.spritesheet('images', 'assets/images'+resolution+'.jpg', 150*resolution, 100*resolution);


        //game.load.audio("win", ["assets/music/win.mp3"]);
        game.load.audio("song17", ["assets/music/song17.ogg", "assets/music/song17.mp3"]);
        game.load.audio("sounds", ["assets/music/sounds.ogg", "assets/music/sounds.mp3"]);

        /*game.load.audio("button", ["assets/music/button.mp3"]);
        game.load.audio("powerup", ["assets/music/powerup.mp3"]);
        game.load.audio("correct", ["assets/music/correct.mp3"]);
        game.load.audio("incorrect", ["assets/music/incorrect2.mp3"]);
        game.load.audio("select_letter", ["assets/music/select_letter.mp3"]);
        game.load.audio("select_letter2", ["assets/music/select_letter2.mp3"]);
        game.load.audio("select_letter3", ["assets/music/select_letter3.mp3"]);
        game.load.audio("select_letter4", ["assets/music/select_letter4.mp3"]);
        game.load.audio("select_letter5", ["assets/music/select_letter5.mp3"]);
        game.load.audio("select_letter6", ["assets/music/select_letter6.mp3"]);
        game.load.audio("select_letter7", ["assets/music/select_letter7.mp3"]);
        game.load.audio("select_letter8", ["assets/music/select_letter8.mp3"]);
        game.load.audio("remove_letter", ["assets/music/remove_letter.mp3"]);
        game.load.audio("witch_laugh", ["assets/music/witch_laugh.mp3"]);
        game.load.audio("witch_sad", ["assets/music/witch_sad.mp3"]);
        game.load.audio("witch_menu", ["assets/music/witch_menu.mp3"]);*/

        this.ready = false;
    },
    create: function () {
        //auto_camera = true;
        if (!this.game.device.desktop)this.game.scale.forceOrientation(false, true, "rotate");
        if (game.device.localStorage) {
            this.TestPrivate();

            var str = Save_getItem("WitchCrossward_sauvegarde", null);
            str_mat = Save_getItem("WitchCrossward_mat", null);
            str_mat_player = Save_getItem("WitchCrossward_mat_player", null);
            level = Save_getItem("WitchCrossward_level", 0);
            nbr_hints = Save_getItem("WitchCrossward_hints", 1);

            if (str == null || str == "null" || level == null || level == "null") {
                /*
                var bg_noire = game.add.image(0, 0, "bgnoire");
                bg_noire.alpha = .7;

                this.pourcentage = 0;
                //var txt_generating = game.add.bitmapText(90 * resolution, 300 * resolution, "fontc", text.txtgenerate, 26 * resolution);
                this.txt_generating = game.add.text(90*resolution, 300*resolution, text.txtgenerate+'\n'+this.pourcentage+'%', {font: (20 * resolution) + langFont2, align: 'center', fill: "#ffffff", stroke: "#000000", strokeThickness: 3 * resolution});
                this.txt_generating.align = 'center';
                //txt_generating.updateText();
                this.txt_generating.x = game.width/2 - this.txt_generating.width/2;
                */

                sauvegarde = [];
                for (var i = 0; i < nombre_levels; i++) {
                    sauvegarde[i] = {numetoile: 0, time: -1, nbr_words: 0, nbr_found: 0}
                }

                all_words = words;
                save_words(all_words);

                //generate_levels = true;
                //game.time.events.add(1000, this.GenerateLevels, this);

                level = 0;
                Save_setItem("WitchCrossward_level", level);

                nbr_hints = 1;
                Save_setItem("WitchCrossward_hints", nbr_hints);

            } else {
                save_lire(str);
            }
        }
    },

    TestPrivate: function () {
        var testKey = "qeTest", storage = window.sessionStorage;
        try {
            storage.setItem(testKey, "1");
            storage.removeItem(testKey)
        } catch (error) {
            if (error.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
                isPrivate = true
            } else {
                isPrivate = false
            }
        }
    },

    update: function () {
        if (game.cache.isSoundDecoded("song17") && game.cache.isSoundDecoded("sounds") && this.ready == false) {
            this.ready = true;
            game.onPause.add(function () {
                gamePaused = true;
                Music.music.pause();
                Music.sounds.pause()
            }, this);
            game.onResume.add(function () {
                gamePaused = false;
                if (Music.enableMisic) {
                    Music.music.resume();
                    Music.sounds.resume()
                }
            }, this);
            /*if (!generate_levels) */
            this.game.state.start("menu");
            play.numLevel = parseInt(level) + 1;
            Music.win = this.game.add.audio("win");
            Music.music = this.game.add.audio("song17");
            //Music.music.volume = .8;

            /*Music.powerup = this.game.add.audio("powerup");
            Music.button = this.game.add.audio("button");
            Music.correct = this.game.add.audio("correct");
            Music.incorrect = this.game.add.audio("incorrect");
            Music.select_letter = this.game.add.audio("select_letter");
            Music.select_letter2 = this.game.add.audio("select_letter2");
            Music.select_letter3 = this.game.add.audio("select_letter3");
            Music.select_letter4 = this.game.add.audio("select_letter4");
            Music.select_letter5 = this.game.add.audio("select_letter5");
            Music.select_letter6 = this.game.add.audio("select_letter6");
            Music.select_letter7 = this.game.add.audio("select_letter7");
            Music.select_letter8 = this.game.add.audio("select_letter8");
            Music.remove_letter = this.game.add.audio("remove_letter");
            Music.witch_laugh = this.game.add.audio("witch_laugh");
            Music.witch_sad = this.game.add.audio("witch_sad");
            Music.witch_menu = this.game.add.audio("witch_menu");*/


            Music.sounds = this.game.add.audio("sounds");
            Music.sounds.addMarker("button", 0, .07789115646258503);
            Music.sounds.addMarker("correct", 2, .770249433106576);
            Music.sounds.addMarker("incorrect", 4, 1.190385487528345);
            Music.sounds.addMarker("powerup", 7, .91312925170068);
            Music.sounds.addMarker("pre_star", 9, .220113378684808);
            Music.sounds.addMarker("select", 10, 0.174149659863945);
            Music.sounds.addMarker("remove_letter", 11, .170045351473924);
            Music.sounds.addMarker("select_letter", 13, .404489795918368);
            Music.sounds.addMarker("select_letter2", 15, .367732426303855);
            Music.sounds.addMarker("select_letter3", 17, .306462585034012);
            Music.sounds.addMarker("select_letter4", 19, .23573696145125);
            Music.sounds.addMarker("select_letter5", 21, .22002267573696);
            Music.sounds.addMarker("select_letter6", 23, .183378684807256);
            Music.sounds.addMarker("select_letter7", 25, .16671201814059);
            Music.sounds.addMarker("select_letter8", 27, .15156462585034);
            Music.sounds.addMarker("star", 29, .605804988662133);
            Music.sounds.addMarker("star2", 31, .572267573696145);
            Music.sounds.addMarker("star3", 33, .46612244897959);
            Music.sounds.addMarker("witch_laugh", 35, .60371882086168);
            Music.sounds.addMarker("witch_menu", 37, 1.960634920634924);
            Music.sounds.addMarker("witch_sad", 40, .630204081632655);
            Music.sounds.addMarker("whoosh", 42, .87074829931973);
            Music.sounds.addMarker("win", 44, 1.589614512471655);

            Music.music.play();

            Music.music.onStop.add(function () {
                if (gamePaused)return;
                if (Music.enableMisic)Music.music.play();
            }, this)
        }
    }
     /*
    GenerateLevels: function(){
        this.pourcentage = Math.floor((0*100)/30);
        str_mat = '';
        str_mat_player = '';

        this.rows = 20;
        this.cols = 20;
        //this.all_words = words;
        this.all_words = [];
        for (var xx = 0; xx<words.length; xx++){
            this.all_words.push(
                {   category: words[xx].category,
                    question: words[xx].question,
                    response: words[xx].response,
                    choices: words[xx].choices
                }
            );
        }

        //this.nbr_words_used = 0;

        this.generation_process(0);
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
        //this.nbr_words_used += this.best_mat.score;
        sauvegarde[i].nbr_words = this.best_mat.score;
        //console.table(this.best_mat.mat);
        save_matrice(this.best_mat.mat);

        this.pourcentage = Math.floor(((i+1)*100)/30);
        this.txt_generating.setText(text.txtgenerate+'\n'+this.pourcentage+'%');
        this.txt_generating.x = game.width/2 - this.txt_generating.width/2;

        if (i<nombre_levels-1){
            game.time.events.add(10, (function(){
                i++;
                //console.log(i);
                this.generation_process(i);
            }), this);
        }else{
            save_ecrit();
            this.game.state.start("menu");
        }
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

            if (this.all_words[id_word] != ''){
                this.vect_words.push({word: this.all_words[id_word].response, question: this.all_words[id_word].question, category: this.all_words[id_word].category, choices: this.all_words[id_word].choices,  position:'-1', isVertical:'-1'});
                this.all_words[id_word] = '';
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
    }*/
};