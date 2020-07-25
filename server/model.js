const { Schema, model } = require('mongoose');

const FileSchema = new Schema({
  meta_data: {}
});

module.exports = model('File', FileSchema);
