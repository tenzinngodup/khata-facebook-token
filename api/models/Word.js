/**
 * Word.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    word:{
      type: 'string',
      required: true
    },
    word_definition:{
      type: 'string'
    },
    english_word:{
      type: 'string',
      required: true
    },
    english_definition:{
      type: 'string'
    },
    like:{
      type: 'integer',
      defaultsTo:0
    },
    dislike:{
      type: 'integer',
      defaultsTo:0
    },
    status:{
      type: 'string',
      enum: ['pending', 'approved', 'denied'],
      defaultsTo:'pending'
    },
    author:{
      model: 'user'
    },
    comments: {
      collection: 'comment',
      via: 'wordRef'
    }
    // dialect:{
    //   type: 'string',
    //   enum: ['ustang', 'kham', 'amdo','choni','ladakhi','balti','burig','lahuli-spiti','dzongkha','sikkimese','sherpa','kyirong-kagate','formal'],
    //   defaultsTo:'ustang'
    // },
    // synonym:{
    //   collection: 'Word',
    //   via: 'id'
    // },
    //tags:{
    //  collection:"Tag",
    //  via:'words'
    //}


  }
};

