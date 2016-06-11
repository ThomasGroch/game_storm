/**
  * @desc This file contains the main example loop
  * @author Cristian Van Herp cristian.vh95@gmail.com
*/

$.getScript("assets/js/keyboard.js", function() {});
$.getScript("assets/js/enums.js", function() {});
$.getScript("assets/js/canvas.js", function() {});
$.getScript("assets/js/sprite.js", function() {});
$.getScript("assets/js/player.js", function() {});

//File path variables
var path_block_brick = 'assets/img/block-brick.png';
var path_background_mario = 'assets/img/background-mario.png';

//Game variables
const FPS = 60;
const TPS = 100;
const APS = 7;

$(document).ready(function() {
    //Object declarations
    var canvas = new Canvas('canvas-game-storming');
    var keyboard = new Keyboard();
    var player = new Player(0, 0, 40, 40, path_block_brick);
    var background = new Sprite(path_background_mario);

    //Frame draw loop
    setInterval(function() {
        canvas.context.fillStyle = "#000000";
        canvas.context.fillRect(0, 0, 800, 600);

        background.draw(canvas, 0, 0, 800, 600);
        player.draw(canvas);

    }, 1000/FPS);

    //Update loop
    setInterval(function() {
        player.update(keyboard);
    }, 1000/TPS);

    //Animation loop
    //TODO Implement sprite movement
    // setInterval(function() {
    //
    // }, 1000/APS);
});
