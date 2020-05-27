const { Schema } = require('mongoose');


const todoSchema = new Schema({
  id: String,
  checked: { type: Boolean, default: false },
  description: String,
  date: {
    start: Date,
    end: Date,
    timezone: Date,
  },
  atGoogle: { type: Boolean, default: false },

});

module.exports = todoSchema;
