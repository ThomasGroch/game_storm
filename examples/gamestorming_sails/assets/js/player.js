/**
  * @desc This file contains the Player "class"
  * @author Cristian Van Herp cristian.vh95@gmail.com
*/

var Player = function(data) {
    this.velx = 0;
    this.vely = 0;
    this.sprite = null;

    for(var field in data) {
        this[field] = data[field];
    }

    //Create sprite
    if(this.sprite_file_path) {
        this.sprite = new Sprite(this.sprite_file_path);
    }
    else {
        console.log('You must specify a sprite file path.');
    }

    this.move = function(keyboard) {
        if(keyboard.isKeyDown(KEY_DOWN)) {
            this.vely = this.speed;
        }
        else if(keyboard.isKeyDown(KEY_UP)) {
            this.vely = -this.speed;
        }
        else {
            this.vely = 0;
        }
        if(keyboard.isKeyDown(KEY_RIGHT)) {
            this.velx = this.speed;
        }
        else if(keyboard.isKeyDown(KEY_LEFT)) {
            this.velx = -this.speed;
        }
        else {
            this.velx = 0;
        }

        this.x += this.velx;
        this.y += this.vely;
    }

    this.draw = function(canvas) {
        this.sprite.draw(canvas, this.x, this.y, this.width, this.height);
    }

    this.update = function(keyboard) {
        this.move(keyboard);
        socket.emit('player_update', this);
    }
}
