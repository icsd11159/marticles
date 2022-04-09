const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  content: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  description: {
    type: String,
    required: false,
    unique: false
  },
  category_id:{
    type: Object,
    required: false,
    unique: false,
    trim: true,
    minlength: 1
  },
}, {
  timestamps: true,
});

const Articles = mongoose.model('Articles', userSchema);

module.exports = Articles;