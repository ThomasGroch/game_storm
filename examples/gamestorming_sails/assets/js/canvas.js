/**
  * @desc This file contains the Canvas "class" that holds the context to be drawed in
  * @author Cristian Van Herp cristian.vh95@gmail.com
*/

var Canvas = function(tag_id) {
    //Attribute definitions
    this.tag_id = tag_id;
    this.object = null;
    this.context = null;

    //Setting canvas context
    if(this.tag_id) {
        this.object = document.getElementById(tag_id);
        this.context = this.object.getContext('2d');
    }
    else {
        console.log('Unable to find the specified Canvas tag.');
    }
}
