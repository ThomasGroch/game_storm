/**
 * Player.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  //Model attributes
  attributes: {
      name: {
          type: 'string',
          required: true,
          unique: true
      },
      x: {
          type: 'integer',
          defaultsTo: 0
      },
      y: {
          type: 'integer',
          defaultsTo: 0
      },
      width: {
          type: 'integer',
          defaultsTo: 40
      },
      height: {
          type: 'integer',
          defaultsTo: 40
      },
      speed: {
          type: 'integer',
          defaultsTo: 3
      },
      sprite_type: {
          type: 'string',
          defaultsTo: 'static'
      },
      sprite_file_path: {
          type: 'string',
          defaultsTo: '/images/block-brick.png'
      }

  },

  //Fields to use on smart methods
  smart_methods_attributes: [
      'x',
      'y'
  ],

  //Smart methods
  smart_update: function(data) {

      if(!data.id) {
          return false;
      }

      var update = {};

      for(var key in this.smart_methods_attributes) {
          var value = this.smart_methods_attributes[key];
          update[value] = data[value];
      }
      this.update({'id': data.id}, update).exec(function(err, data) {});
  }
};
