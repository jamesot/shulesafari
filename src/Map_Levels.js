WitchCrossward.Map_Levels = function (game){
    this.debut_swip=null;
    this.moveto=null;
    this.bnt_home=null;
    this.isbegin=null;
    this.vitess_camera=null;
    this.bnt_level = null;
    this.vect_positions = null;
    this.group_bnt = null;

    this.is_cam_moving = null;

    this.stop_position = null;

    this.group_ghosts = null;
};

WitchCrossward.Map_Levels.prototype={

    create : function() {

    // DH EDIT **** OLD BACKUP LIST *****
        // this.vect_positions = [
        //     {x: 190*resolution, y:457*resolution, num: 1},
        //     {x: 152*resolution, y:428*resolution, num: 2},
        //     {x: 115*resolution, y:400*resolution, num: 3},
        //     {x: 75*resolution, y:370*resolution, num: 4},
        //     {x: 50*resolution, y:330*resolution, num: 5},
        //     {x: 70*resolution, y:290*resolution, num: 6},
        //     {x: 103*resolution, y:255*resolution, num: 7},
        //     {x: 243*resolution, y:218*resolution, num: 8},
        //     {x: 185*resolution, y:190*resolution, num: 9},
        //     {x: 160*resolution, y:150*resolution, num: 10},
        //     {x: 108*resolution, y:157*resolution, num: 11},
        //     {x: 108*resolution, y:105*resolution, num: 12},
        //     {x: 163*resolution, y:70*resolution, num: 13},
        //     {x: 95*resolution, y:50*resolution, num: 14},
        //     {x: 138*resolution, y:22*resolution, num: 15},
        //     {x: 165*resolution, y:-12*resolution, num: 16},
        //     {x: 130*resolution, y:-47*resolution, num: 17},
        //     {x: 110*resolution, y:-85*resolution, num: 18},
        //     {x: 158*resolution, y:-105*resolution, num: 19},
        //     {x: 205*resolution, y:-125*resolution, num: 20},
        //     {x: 225*resolution, y:-167*resolution, num: 21},
        //     {x: 200*resolution, y:-205*resolution, num: 22},
        //     {x: 180*resolution, y:-245*resolution, num: 23},
        //     {x: 220*resolution, y:-272*resolution, num: 24},
        //     {x: 240*resolution, y:-310*resolution, num: 25},
        //     {x: 220*resolution, y:-348*resolution, num: 26},
        //     {x: 180*resolution, y:-370*resolution, num: 27},
        //     {x: 135*resolution, y:-385*resolution, num: 28},
        //     {x: 140*resolution, y:-428*resolution, num: 29},
        //     {x: 170*resolution, y:-460*resolution, num: 30}
        // ];

// DH EDIT **** NEW FULL MAP STEP POSITIONS
        // this.vect_positions = [
        //     {x: 288*resolution, y:(946-490)*resolution, num: 1},
        //     {x: 274*resolution, y:(919-490)*resolution, num: 2},
        //     {x: 256*resolution, y:(890-490)*resolution, num: 3},
        //     {x: 229*resolution, y:(865-490)*resolution, num: 4},
        //     {x: 196*resolution, y:(844-490)*resolution, num: 5},
        //     {x: 172*resolution, y:(817-490)*resolution, num: 6},
        //     {x: 153*resolution, y:(787-490)*resolution, num: 7},
        //     {x: 143*resolution, y:(758-490)*resolution, num: 8},
        //     {x: 145*resolution, y:(730-490)*resolution, num: 9},
        //     {x: 152*resolution, y:(702-490)*resolution, num: 10},
        //     {x: 175*resolution, y:(676-490)*resolution, num: 11},
        //     {x: 202*resolution, y:(655-490)*resolution, num: 12},
        //     {x: 230*resolution, y:(635-490)*resolution, num: 13},
        //     {x: 249*resolution, y:(610-490)*resolution, num: 14},
        //     {x: 265*resolution, y:(585-490)*resolution, num: 15},
        //     {x: 267*resolution, y:(559-490)*resolution, num: 16},
        //     {x: 247*resolution, y:(537-490)*resolution, num: 17},
        //     {x: 227*resolution, y:(509-490)*resolution, num: 18},
        //     {x: 204*resolution, y:(487-490)*resolution, num: 19},
        //     {x: 159*resolution, y:(471-490)*resolution, num: 20},
        //     {x: 119*resolution, y:(464-490)*resolution, num: 21},
        //     {x: 70*resolution, y:(460-490)*resolution, num: 22},
        //     {x: 23*resolution, y:(437-490)*resolution, num: 23},
        //     {x: 27*resolution, y:(389-490)*resolution, num: 24},
        //     {x: 64*resolution, y:(344-490)*resolution, num: 25},
        //     {x: 114*resolution, y:(332-490)*resolution, num: 26},
        //     {x: 171*resolution, y:(339-490)*resolution, num: 27},
        //     {x: 208*resolution, y:(357-490)*resolution, num: 28},
        //     {x: 220*resolution, y:(402-490)*resolution, num: 29},
        //     {x: 212*resolution, y:(433-490)*resolution, num: 30}
        // ];


// DH EDIT **** NEW SHORT MAP STEP POSITIONS
        this.vect_positions = [
            {x: 202*resolution, y:(655-490)*resolution, num: 1},
            {x: 256*resolution, y:(585-490)*resolution, num: 2},
            {x: 227*resolution, y:(509-490)*resolution, num: 3},
            {x: 159*resolution, y:(471-490)*resolution, num: 4}
        ];

        this.add.sprite(0, 0, 'map1');
        this.add.sprite(0,-480*resolution, 'map2');

        ////////////camera//////////////
        game.world.setBounds(0, -480*resolution, 320*resolution,960*resolution);

        this.isbegin=auto_camera;
        this.vitess_camera=0 ;

        this.debut_swip=0;
        this.moveto=0;
        this.is_cam_moving = true;
        game.input.onDown.add(this.start_swipe, this);

        ////////////////////////////////
        this.group_ghosts = game.add.group();

        // var ghost1 = game.add.sprite(95*resolution, 325*resolution, 'sprites2', 'ghost'+resolution+'.png');
        // ghost1.anchor.setTo(.5,.5);
        // ((game.add.tween(ghost1).to({y: ghost1.y + 5*resolution}, 1500, Phaser.Easing.Quadratic.InOut).to({y: ghost1.y}, 1500, Phaser.Easing.Quadratic.InOut)).loop()).start();
        // ((game.add.tween(ghost1).to({alpha:0, height: 0},400,Phaser.Easing.Quadratic.In, false, 4000).to({alpha:1, height: ghost1.texture.height},400,Phaser.Easing.Back.Out, false, 4000)).loop()).start();
        // this.group_ghosts.add(ghost1);

        // var ghost2 = game.add.sprite(265*resolution, 115*resolution, 'sprites2', 'ghost'+resolution+'.png');
        // ghost2.anchor.setTo(.5,.5);
        // ((game.add.tween(ghost2).to({y: ghost2.y + 5*resolution}, 1500, Phaser.Easing.Quadratic.InOut).to({y: ghost2.y}, 1500, Phaser.Easing.Quadratic.InOut)).loop()).start();
        // ((game.add.tween(ghost2).to({alpha:0, height: 0},400,Phaser.Easing.Quadratic.In, false, 5000).to({alpha:1, height: ghost2.texture.height},400,Phaser.Easing.Back.Out, false, 5000)).loop()).start();
        // this.group_ghosts.add(ghost2);

        // var ghost3 = game.add.sprite(15*resolution, -38*resolution, 'sprites2', 'ghost'+resolution+'.png');
        // ghost3.anchor.setTo(.5,.5);
        // ghost3.scale.x = -0.7;
        // ((game.add.tween(ghost3).to({y: ghost3.y + 5*resolution}, 1500, Phaser.Easing.Quadratic.InOut).to({y: ghost3.y}, 1500, Phaser.Easing.Quadratic.InOut)).loop()).start();
        // ((game.add.tween(ghost3).to({alpha:0, height: 0},400,Phaser.Easing.Quadratic.In, false, 3000).to({alpha:1, height: ghost3.texture.height},400,Phaser.Easing.Back.Out, false, 3000)).loop()).start();
        // this.group_ghosts.add(ghost3);

        // var ghost4 = game.add.sprite(177*resolution, -160*resolution, 'sprites2', 'ghost'+resolution+'.png');
        // ghost4.anchor.setTo(.5,.5);
        // ghost4.scale.x = -0.7;
        // ((game.add.tween(ghost4).to({y: ghost4.y + 5*resolution}, 1500, Phaser.Easing.Quadratic.InOut).to({y: ghost4.y}, 1500, Phaser.Easing.Quadratic.InOut)).loop()).start();
        // ((game.add.tween(ghost4).to({alpha:0, height: 0},400,Phaser.Easing.Quadratic.In, false, 4000).to({alpha:1, height: ghost4.texture.height},400,Phaser.Easing.Back.Out, false, 4000)).loop()).start();
        // this.group_ghosts.add(ghost4);

        // var ghost5 = game.add.sprite(247*resolution, -227*resolution, 'sprites2', 'ghost'+resolution+'.png');
        // ghost5.anchor.setTo(.5,.5);
        // ((game.add.tween(ghost5).to({y: ghost5.y + 5*resolution}, 2000, Phaser.Easing.Quadratic.InOut).to({y: ghost5.y}, 2000, Phaser.Easing.Quadratic.InOut)).loop()).start();
        // ((game.add.tween(ghost5).to({alpha:0, height: 0},400,Phaser.Easing.Quadratic.In, false, 5000).to({alpha:1, height: ghost5.texture.height},400,Phaser.Easing.Back.Out, false, 5000)).loop()).start();
        // this.group_ghosts.add(ghost5);

        // var ghost5 = game.add.sprite(265*resolution, -215*resolution, 'sprites2', 'ghost'+resolution+'.png');
        // ghost5.anchor.setTo(.5,.5);
        // ghost5.scale.setTo(.75,.75);
        // ((game.add.tween(ghost5).to({y: ghost5.y + 5*resolution}, 1500, Phaser.Easing.Quadratic.InOut).to({y: ghost5.y}, 1500, Phaser.Easing.Quadratic.InOut)).loop()).start();
        // ((game.add.tween(ghost5).to({alpha:0, height: 0},400,Phaser.Easing.Quadratic.In, false, 5000).to({alpha:1, height: ghost5.texture.height*0.75},400,Phaser.Easing.Back.Out, false, 5000)).loop()).start();
        // this.group_ghosts.add(ghost5);

        // var ghost6 = game.add.sprite(72*resolution, -410*resolution, 'sprites2', 'ghost'+resolution+'.png');
        // ghost6.anchor.setTo(.5,.5);
        // ghost6.scale.setTo(-0.75,.75);
        // ((game.add.tween(ghost6).to({y: ghost6.y + 5*resolution}, 1500, Phaser.Easing.Quadratic.InOut).to({y: ghost6.y}, 1500, Phaser.Easing.Quadratic.InOut)).loop()).start();
        // ((game.add.tween(ghost6).to({alpha:0, height: 0},400,Phaser.Easing.Quadratic.In, false, 4000).to({alpha:1, height: ghost6.texture.height*0.75},400,Phaser.Easing.Back.Out, false, 4000)).loop()).start();
        // this.group_ghosts.add(ghost6);

        ///////////////// boutons levels  //////////////
        this.group_bnt = game.add.group();
        var framebnt = 0;
        for (var i=0; i<nombre_levels; i++){
            framebnt = 0;

            this.bnt_level = new Bouton(this.game,this.vect_positions[i].x,this.vect_positions[i].y,'levelbnt',null,null);
            this.bnt_level.anchor.y = 1;
            this.bnt_level.y += this.bnt_level.height/2;

            this.bnt_level.onInputUp.add(function (){
                if(this.frame != 4 && !lv.isbegin && !lv.is_cam_moving){
                    lv.Activer_Input(false);
                    play.numLevel=parseInt(this.txt.text);
                    play.InitialiseFade('play');
                    play.bgnoire.y=game.camera.y;
                }
            },this.bnt_level);

            this.bnt_level.txt=new Phaser.Text(game, this.bnt_level.x- (4*resolution),this.bnt_level.y - this.bnt_level.height/2 - (2.25*resolution), ''+this.vect_positions[i].num, {font: 13 * resolution + langFont, align: "center", fill: "#ffffff", stroke: "#125fff", strokeThickness: 2.5 * resolution});
            this.bnt_level.txt.x = this.bnt_level.x - this.bnt_level.txt.width/2 + 0.5*resolution;

            this.group_bnt.add(this.bnt_level);
            this.group_bnt.add(this.bnt_level.txt);

            if(+this.bnt_level.txt.text<=+level+1){
                framebnt = sauvegarde[+this.bnt_level.txt.text-1].numetoile;
            }else{
                framebnt = 4;
                this.bnt_level.txt.visible = false;
            }

            this.bnt_level.frame = framebnt;
        }

        game.camera.y = -480*resolution;
        this.stop_position = this.vect_positions[level].y - this.group_bnt.getAt(0).height/2 - (200*resolution);

        if (this.stop_position > 50*resolution)
            this.stop_position = 50*resolution;

        if(this.isbegin && +level < 27){
            ((game.add.tween(game.camera).to({y:this.stop_position},2500,Phaser.Easing.Quadratic.InOut)).start())
                .onComplete.add(function(){
                    this.isbegin=false;
                    this.camera.y=this.stop_position;
                    auto_camera=false;
                },this);
        }else{
            game.camera.y=this.stop_position;
            this.isbegin=false;
            auto_camera=false;
        }
        ////////////////////////////////////////////
        this.bnt_home=new Bouton(this.game, 25 * resolution,25 * resolution, 'sprites2', this.func_home,this);
        this.bnt_home.frameName = 'bnt_home'+resolution+'.png';
        this.bnt_home.fixedToCamera=true;
        this.world.add(this.bnt_home);

        if (new_level){
            if (play.numLevel-1 <= 29)
                this.Show_Stars(level);
            else
                this.Show_Stars(+level+1);
        }
    },

    start_swipe : function (){
        if (this.isbegin) return;
        this.debut_swip =  game.input.activePointer.y ;
        if (this.is_cam_moving) this.is_cam_moving = false;
    },
    swipe_to : function(){

        if(game.input.activePointer.isDown){
            this.moveto= game.input.activePointer.y;
        }
        if(Math.abs(this.moveto-this.debut_swip)>0.5){
            game.camera.y-=game.time.elapsed *0.001*(40*resolution)*(this.moveto-this.debut_swip)/7;
            this.debut_swip+=(this.moveto-this.debut_swip)/7;
            if (!this.is_cam_moving) this.is_cam_moving = true;
        }
    },


    update : function (){
        if (!this.isbegin && game.input.onDown.active){
            this.swipe_to();
        }

        /*if (this.clicked_bnt != null){
            updateLevelstatus(this.clicked_bnt);
        }*/
    },
    func_home : function  () {
        if(this.isbegin)return;

        play.InitialiseFade('menu');
        play.bgnoire.y=game.camera.y;
    },

    Activer_Input: function(bool){
        lv.group_bnt.forEach((function(sp){
            game.input.onDown.active = bool;
        }), this);
    },

    Show_Stars: function(numlevel){
        this.Activer_Input(false);
        this.group_bnt.getAt((numlevel*2)-2).frame = 0;

        if (numlevel < nombre_levels){
            this.group_bnt.getAt((numlevel*2)).txt.alpha = 0;
            this.group_bnt.getAt((numlevel*2)).frame = 4;
        }

        if (sauvegarde[numlevel-1].numetoile >= 1){
            var star1 = game.add.sprite(this.group_bnt.getAt((numlevel*2)-2).x - (13*resolution), this.group_bnt.getAt((numlevel*2)-2).y - (29.5*resolution), 'sprites2', 'star_levels'+resolution+'.png');
            star1.scale.setTo(0,0);
            star1.angle = -30;
            star1.anchor.setTo(.5,.5);
            //star1.scale.setTo(.72,.72);
            //star1.alpha = 0.7;

            ((game.add.tween(star1.scale).to({x:1.1, y:1.1}, 200 , Phaser.Easing.Linear.None, false, 500).to({x:.72, y:.72}, 300 , Phaser.Easing.Back.Out)).start()).onComplete.add((function(){
                game.time.events.add(100, (function(){
                    if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play('pre_star');
                    if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play('star');
                }), this);

                var emitter = game.add.emitter(this.x, this.y - this.height/4, 20);
                emitter.makeParticles('light_snow');
                emitter.setAlpha(1,0,1500,Phaser.Easing.Linear.None);
                emitter.setScale(0.1,0.25);
                emitter.minParticleSpeed.setTo(-50, -25);
                emitter.maxParticleSpeed.setTo(50, 50);
                emitter.start(true, 1500, 20, 20);
            }), star1);
        }

        if (sauvegarde[numlevel-1].numetoile >= 2){
            var star2 = game.add.sprite(this.group_bnt.getAt((numlevel*2)-2).x, this.group_bnt.getAt((numlevel*2)-2).y - (34.5*resolution), 'sprites2', 'star_levels'+resolution+'.png');
            star2.anchor.setTo(.5,.5);
            //star2.scale.setTo(.92,.92);
            //star2.alpha = 0.7;
            star2.scale.setTo(0,0);

            ((game.add.tween(star2.scale).to({x:1.25, y:1.25}, 200 , Phaser.Easing.Linear.None, false, 1000).to({x:.92, y:.92}, 300 , Phaser.Easing.Back.Out)).start()).onComplete.add((function(){
                game.time.events.add(100, (function(){
                    if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play('pre_star');
                    if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play('star2');
                }), this);

                var emitter = game.add.emitter(this.x, this.y - this.height/4, 20);
                emitter.makeParticles('light_snow');
                emitter.setAlpha(1,0,1500,Phaser.Easing.Linear.None);
                emitter.setScale(0.1,0.25);
                emitter.minParticleSpeed.setTo(-50, -25);
                emitter.maxParticleSpeed.setTo(50, 50);
                emitter.start(true, 1500, 20, 20);
            }), star2);
        }

        if (sauvegarde[numlevel-1].numetoile >= 3){
            var star3 = game.add.sprite(this.group_bnt.getAt((numlevel*2)-2).x + (13.5*resolution), this.group_bnt.getAt((numlevel*2)-2).y - (29*resolution), 'sprites2', 'star_levels'+resolution+'.png');
            star3.scale.setTo(0,0);
            star3.angle = 35;
            star3.anchor.setTo(.5,.5);
            //star3.scale.setTo(.72,.72);
            //star3.alpha = 0.7;

            ((game.add.tween(star3.scale).to({x:1.1, y:1.1}, 200 , Phaser.Easing.Linear.None, false, 1500).to({x:.72, y:.72}, 300 , Phaser.Easing.Back.Out)).start()).onComplete.add((function(){
                game.time.events.add(100, (function(){
                    if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play('pre_star');
                    if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play('star3');
                }), this);

                var emitter = game.add.emitter(this.x, this.y - this.height/4, 20);
                emitter.makeParticles('light_snow');
                emitter.setAlpha(1,0,1500,Phaser.Easing.Linear.None);
                emitter.setScale(0.1,0.25);
                emitter.minParticleSpeed.setTo(-50, -25);
                emitter.maxParticleSpeed.setTo(50, 50);
                emitter.start(true, 1500, 20, 20);
            }), star3);
        }

        game.time.events.add((sauvegarde[numlevel-1].numetoile*500) + 500, (function(){
            this.group_bnt.getAt((numlevel*2)-2).frame = sauvegarde[numlevel-1].numetoile;
            if (star1 && star1.alive) star1.kill();
            if (star2 && star2.alive) star2.kill();
            if (star3 && star3.alive) star3.kill();

            if (numlevel < nombre_levels){
                ((game.add.tween(this.group_bnt.getAt((numlevel*2)).scale).to({x:0, y:0}, 200 , Phaser.Easing.Linear.None, false, 200).to({x:1, y:1}, 500 , Phaser.Easing.Back.Out)).start()).onComplete.add((function(){
                    this.group_bnt.getAt((numlevel*2)).frame = 0;
                    (game.add.tween(this.group_bnt.getAt((numlevel*2)).txt).to({alpha:1}, 300 , Phaser.Easing.Quadratic.Out, false, 500)).start();
                }), this);
            }


            this.Activer_Input(true);
            new_level = false;
        }), this);
    }
    /*,

    Tween_Button: function(numlevel){
        //this.group_bnt.getAt((numlevel*2)).txt.scale.setTo(0,0);
        this.group_bnt.getAt((numlevel*2)).txt.alpha = 0;
        this.group_bnt.getAt((numlevel*2)).frame = 4;

        ((game.add.tween(this.group_bnt.getAt((numlevel*2)).scale).to({x:0, y:0}, 200 , Phaser.Easing.Linear.None, false, 200).to({x:1, y:1}, 500 , Phaser.Easing.Back.Out)).start()).onComplete.add((function(){
            this.group_bnt.getAt((numlevel*2)).frame = 0;
            //this.group_bnt.getAt((numlevel*2)).txt.scale.setTo(1,1);
            //this.group_bnt.getAt((numlevel*2)).txt.x += (5*resolution);
            //this.group_bnt.getAt((numlevel*2)).txt.y += (5*resolution);
            //(game.add.tween(this.group_bnt.getAt((numlevel*2)).txt).to({x:this.group_bnt.getAt((numlevel*2)).txt.x-(5*resolution)}, 200 , Phaser.Easing.Linear.None, false, 300)).start();
            //(game.add.tween(this.group_bnt.getAt((numlevel*2)).txt.scale).to({x:1, y:1}, 200 , Phaser.Easing.Quadratic.Out, false, 500)).start();
            (game.add.tween(this.group_bnt.getAt((numlevel*2)).txt).to({alpha:1}, 300 , Phaser.Easing.Quadratic.Out, false, 500)).start();
        }), this);
    }*/
};