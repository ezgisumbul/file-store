'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    uploadName: {
      type: String
    },
    document: {
      type: String
    },
    base64: {
      type: String
    },
    url: {
      type: String
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    type: {
      type: String,
      trim: true,
      required: true
    },
    dowloadAmount: {
      type: Number
      //   required: true
    },
    size: {
      type: Number
    }
  },
  { timestamps: true }
);

const File = mongoose.model('File', schema);

module.exports = File;
