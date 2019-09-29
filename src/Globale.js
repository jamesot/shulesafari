//var langFont = 'px "Arial"';
//var langFont = 'px "Roboto"';
var langFont2 = 'px "Mystery Quest"';
//var langFont = 'px "Concert One"';
var langFont = 'px "Acme"';
var resolution = 2;
var isPrivate = false;
var gamePaused = false;
var auto_camera = false;
var new_level=false;
var str_mat = '';
var str_mat_player = '';
var all_words = [];
//var generate_levels = false;


// var timeLevel = [120, 120, 120, 120, 120, 150, 150, 150, 150, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210];
// DH EDIT for ONLY 4 LEVELS
var timeLevel = [120, 120, 120, 120];

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (iOS) {
    window.PhaserGlobal = {audioContext: createAudioContext(44100)};
    function createAudioContext(desiredSampleRate) {
        var AudioCtor = window.AudioContext || window.webkitAudioContext;
        desiredSampleRate = typeof desiredSampleRate === "number" ? desiredSampleRate : 44100;
        var context = new AudioCtor;
        if (/(iPhone|iPad)/i.test(navigator.userAgent) && context.sampleRate !== desiredSampleRate) {
            var buffer = context.createBuffer(1, 1, desiredSampleRate);
            var dummy = context.createBufferSource();
            dummy.buffer = buffer;
            dummy.connect(context.destination);
            dummy.start(0);
            dummy.disconnect();
            context.close();
            context = new AudioCtor
        }
        return context
    }
}

