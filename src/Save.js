var sauvegarde = [];
var matrice = [];
var matrice_player = [];
var str_mat = [];
var str_mat_player = [];
var nbr_hints = 1;
var level;
// var nombre_levels = 30;

//DH EDIT FEWER LEVELS
var nombre_levels = 4;

function Save_setItem(name, value) {
    if (!isPrivate)localStorage.setItem(name, value)
}
function Save_getItem(name, pardefaut) {
    if (!isPrivate)return localStorage.getItem(name); else return pardefaut
}
function save_lire(str1) {
    sauvegarde = [];
    var str = str1.split(",");
    var ligne = 0;
    var ii = 0;
    while (ligne < str.length) {
        sauvegarde[ii] = {numetoile: 0, time: -1, nbr_words: 0, nbr_found: 0};
        sauvegarde[ii].numetoile = +str[ligne++];
        sauvegarde[ii].time = +str[ligne++];
        sauvegarde[ii].nbr_words = +str[ligne++];
        sauvegarde[ii].nbr_found = +str[ligne++];
        ii++
    }
}
function save_ecrit() {
    var str = "";
    for (var i = 0; i < nombre_levels; i++) {
        str += "" + sauvegarde[i].numetoile;
        str += ",";
        str += "" + sauvegarde[i].time;
        str += ",";
        str += "" + sauvegarde[i].nbr_words;
        str += ",";
        str += "" + sauvegarde[i].nbr_found;
        if (i < nombre_levels - 1)str += ","
    }
    Save_setItem("WitchCrossward_sauvegarde", str);
}


// test
function save_matrice(mat) {
    //str_mat = "";

    //for (var i = 0; i < nombre_levels; i++) {
    for (var ii=0; ii<20; ii++){
        for (var jj=0; jj<20; jj++){
            str_mat += mat[ii][jj];
            /*if (i < nombre_levels - 1 && !(ii >= 19 && jj >= 19))*/
            str_mat += ",";

            str_mat_player += '*';
            str_mat_player += ",";
        }
    }
    //}
    Save_setItem("WitchCrossward_mat", str_mat);
    Save_setItem("WitchCrossward_mat_player", str_mat_player);
}

function load_matrice(num_level) {
    //console.log(num_level);
    matrice = [];
    matrice_player = [];

    for (var i=0; i<20; i++){
        matrice[i] = [];
        matrice_player[i] = [];
        for (var j=0; j<20; j++){
            matrice[i][j] = '';
            matrice_player[i][j] = '';
        }
    }

    var str = str_mat.split(",");
    var str_player = str_mat_player.split(",");

    var ligne = (400*num_level);
    var ii = 0;
    var jj = 0;
    while (ligne < (400*num_level)+400) {
        matrice[ii][jj] = str[ligne];
        matrice_player[ii][jj] = str_player[ligne];
        ligne++;
        jj++;
        if (jj >= 20){
            jj = 0;
            ii++;
        }
    }
}

function save_word(letter, level, i, j) {
    var index = (800*level)+((i*20)+j)*2;
    //console.log(index+' / '+letter);
    str_mat_player = str_mat_player.substring(0, index) + letter + str_mat_player.substring(index+1, str_mat_player.length);

    Save_setItem("WitchCrossward_mat_player", str_mat_player);
}

function load_words(str1) {
    all_words = [];
    var str = str1.split(",");

    var ligne = 0;
    var ii = 0;
    while (ligne < str.length) {
        all_words[ii] = {category: '*', question: '*', response: '*', choices: '*'};
        all_words[ii].category = str[ligne++];
        all_words[ii].question = str[ligne++];
        all_words[ii].response = str[ligne++];
        all_words[ii].choices = str[ligne++];
        ii++
    }
}
function save_words(vect_words) {
    var str = "";
    for (var i = 0; i < words.length; i++) {
        str += "" + vect_words[i].category;
        str += ",";
        str += "" + vect_words[i].question;
        str += ",";
        str += "" + vect_words[i].response;
        str += ",";
        str += "" + vect_words[i].choices;
        if (i < words.length - 1)str += ","
    }
    Save_setItem("WitchCrossward_words", str);
}