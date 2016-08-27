/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    facebookId: {
      type: 'string',
      required: true,
      unique: true
    },
    displayName:'string',
    email:'string',
    token:"string",
    toJSON: function() {
      var obj = this.toObject();
      delete obj.token;
      delete obj.email;
      return obj;
    }

  }
};

