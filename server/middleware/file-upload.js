// multer is used to process multipart form data

const multer = require('multer');

const upload = multer({
  // uploaded files are kept in dist folder in the server
  dest: 'dist/',
  // allows uploading files up to 25MB
  limits: { fieldSize: 25 * 1024 * 1024 }
});

module.exports = upload;
