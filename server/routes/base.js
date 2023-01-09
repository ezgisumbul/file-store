'use strict';

const express = require('express');
const fileUpload = require('../middleware/file-upload');
const router = express.Router();

const File = require('./../models/file');
const cloudinary = require('./../middleware/cloudinary');

// Load all files
router.get('/', (req, res, next) => {
  File.find()
    .then((files) => {
      res.json({ data: files });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

// Creates new file in the server and uploads it to the cloud
// multer requires a file uploading middleware to be passed
// single method is called on the input element with the name='document'
// this allows only a single file to be uploaded
router.post('/', fileUpload.single('document'), (req, res, next) => {
  const { base64, name, type, dowloadAmount, size } = req.body;

  let document;
  let uploadName;

  if (req.file) {
    document = req.file.path;
    uploadName = req.file.filename;
  }

  cloudinary.uploader
    .upload(base64, {
      resource_type: 'auto'
    })
    .then((result) => {
      console.log('file uploaded');
      File.create({
        uploadName,
        document,
        base64,
        url: result.url,
        name,
        type,
        dowloadAmount,
        size
      });
    })
    .then((file) => {
      res.json({ file });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

// updates the downloadAmount information in the database for the downloaded file
router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  const { count } = req.body;

  File.findByIdAndUpdate({ _id: id }, { dowloadAmount: `${count}` })
    .then((file) => {
      console.log('file updated');
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
