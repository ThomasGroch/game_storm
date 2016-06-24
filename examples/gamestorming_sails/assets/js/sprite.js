/**
  * @desc This file contains the Sprite "class"
  * @author Cristian Van Herp cristian.vh95@gmail.com
*/

var Sprite = function(file_path, is_pattern) {

    //Attribute definitions
    this.image = null;
    this.is_pattern = is_pattern;
    this.TO_RADIANS = Math.PI/180;

    //Creating image object
    if(file_path) {
        this.image = new Image();
        this.image.src = file_path;
    }
    else {
        console.log('Unable to load the specified file path.');
    }

    //Function definitions
    this.draw = function(canvas, x, y, w, h) {
        //Use parameter width and height if set, or, original image dimensions
        var width = w ? w : this.image.width;
        var height = h ? h : this.image.height;

        //Pattern?
        if(this.is_pattern) {
            //Create pattern
            var pattern = canvas.context.createPattern(this.image, 'repeat');

            //Draw pattern
            canvas.context.fillStyle = pattern;
            canvas.context.fillRect(x, y, w, h);
        }
        else {
            //Draw regular image
            canvas.context.drawImage(this.image, x, y, width, height);
        }
    };

    this.rotate = function(canvas, x, y, angle) {
        canvas.context.save();
        canvas.context.translate(x, y);
        canvas.context.rotate(angle * this.TO_RADIANS);
        canvas.context.drawImage(this.image, -(this.image.width/2), -(this.image.height/2));
        canvas.context.restore();
    }
}
