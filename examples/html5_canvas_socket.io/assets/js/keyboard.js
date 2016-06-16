/**
  * @desc This file contains the Keyboard "class" that defines input event listeners and related utilities
  * @author Cristian Van Herp cristian.vh95@gmail.com
*/

//Key Code constant definitions
//TODO Define all the other keys
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;

var Keyboard = function() {
    var keyboard = this;
    //Key map that indicated the current state of keys
    this.key_map = [];
    this.key_map[KEY_LEFT] = false;
    this.key_map[KEY_UP] = false;
    this.key_map[KEY_RIGHT] = false;
    this.key_map[KEY_DOWN] = false;

    //Is key down?
    this.isKeyDown = function(key_code) {
        return !!this.key_map[key_code];
    };

    //Sets event listener to update the state of the key_map when a key is pressed
    $(document).keydown(function(e) {
        keyboard.key_map.forEach(function(value, key) {
            if(e.keyCode == key) {
                keyboard.key_map[key] = 1;
            }
        });
    });

    //Sets event listener to update the state of the key_map when a key is released
    $(document).keyup(function(e) {
        socket.emit('client_request', {'message': 'key' + e.keyCode + ' was released'});
        keyboard.key_map.forEach(function(value, key) {
            if(e.keyCode == key) {
                keyboard.key_map[key] = 0;
            }
        });
    });
}
