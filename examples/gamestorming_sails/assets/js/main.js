/**
  * @desc This file contains the main example loop
  * @author Cristian Van Herp cristian.vh95@gmail.com
*/

//Socket object
var socket = io.connect('http://localhost:8080');

$(document).ready(function() {

    //File path variables
    var path_block_brick = '/images/block-brick.png';
    var path_background_mario = '/images/background-mario.png';

    //Game variables
    const FPS = 60;
    const TPS = 100;
    const APS = 7;

    //Object declarations
    var canvas = new Canvas('canvas-game-storming');
    var keyboard = new Keyboard();
    var player = new Player(player_info.id, player_info.x, player_info.y, 40, 40, path_block_brick);
    var background = new Sprite(path_background_mario);

    //Socket callbacks
    var onPlayerLocation = function(data) {
        if(data && player) {
            player.x = data.x;
            player.y = data.y;
        }
        player.x = data.x;
    }

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
