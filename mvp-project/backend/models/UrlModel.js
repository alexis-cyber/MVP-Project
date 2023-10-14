const mongoose = require('mongoose');
const utils = require('../utils/util');

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    // required: true,
  },
  origUrl: {
    type: String,
    // required: true,
    // validate: {
    //   validator: utils.validateUrl,
    //   message: 'Invalid Original Url',
    // },
  },
  shortUrl: {
    type: String,
    // required: true,
  },
  clicks: {
    type: Number,
    // required: true,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
});
const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;